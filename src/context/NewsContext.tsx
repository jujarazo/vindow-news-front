import { AxiosError } from 'axios';
import { createContext, useReducer, useState } from 'react';
import { News } from '../components';
import { newsSearchUrl, pageSize } from '../constants';
import { handleErrorMessage } from '../helpers';
import { get } from '../service/http';

export type NewsContextType = {
  isLoadingNews: boolean;
  newsList: News[];
  currentPage: number;
  totalPages: number;
  currentSearchTerm: string;
  showErrorAlert: boolean;
  errorMessage: string;
  handleSearchNews: (searchTerm: string, page: number) => void;
};

const NewsContext = createContext<NewsContextType>({} as NewsContextType);

type NewsState = {
  isLoadingNews: boolean;
  newsList: News[];
  currentPage: number;
  totalPages: number;
  currentSearchTerm: string;
  showErrorAlert: boolean;
  errorMessage: string;
};

enum NewsActionTypes {
  IS_LOADING = 'IS_LOADING',
  LOADED = 'LOADED',
  UPDATE_NEWS = 'UPDATE_NEWS',
  CHANGE_CURRENT_PAGE = 'CHANGE_CURRENT_PAGE',
  CHANGE_TOTAL_PAGES = 'CHANGE_TOTAL_PAGES',
  SEARCH_TERM = 'SEARCH_TERM',
  SHOW_ERROR = 'SHOW_ERROR',
  HIDE_ERROR = 'HIDE_ERROR',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
}

type NewsAction = {
  type: NewsActionTypes;
  payload?: {
    newsList?: News[];
    currentPage?: number;
    totalPages?: number;
    searchTerm?: string;
    errorMessage?: string;
  };
};

const initialState = {
  isLoadingNews: false,
  newsList: [],
  currentPage: 1,
  totalPages: 1,
  currentSearchTerm: '',
  showErrorAlert: false,
  errorMessage: '',
};

function newsReducer(state: NewsState, action: NewsAction) {
  const { type, payload } = action;

  switch (type) {
    case NewsActionTypes.IS_LOADING:
      return { ...state, isLoadingNews: true };

    case NewsActionTypes.LOADED:
      return { ...state, isLoadingNews: false };

    case NewsActionTypes.UPDATE_NEWS:
      return { ...state, newsList: payload?.newsList || [] };

    case NewsActionTypes.CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: payload?.currentPage || 1 };

    case NewsActionTypes.CHANGE_TOTAL_PAGES:
      return { ...state, totalPages: payload?.totalPages || 1 };

    case NewsActionTypes.SEARCH_TERM:
      return { ...state, currentSearchTerm: payload?.searchTerm || '' };

    case NewsActionTypes.SHOW_ERROR:
      return { ...state, showErrorAlert: true };

    case NewsActionTypes.HIDE_ERROR:
      return { ...state, showErrorAlert: false };

    case NewsActionTypes.ERROR_MESSAGE:
      return { ...state, errorMessage: payload?.errorMessage || '' };

    default:
      return state;
  }
}

export function NewsProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(newsReducer, initialState);
  const {
    newsList,
    isLoadingNews,
    showErrorAlert,
    errorMessage,
    currentPage,
    currentSearchTerm,
    totalPages,
  } = state;

  const handleSearchNews = async (searchTerm: string, page: number) => {
    // Update the loading state to it's currently loading
    dispatch({ type: NewsActionTypes.IS_LOADING });

    // In case the current page changed update the state
    if (currentPage !== page)
      dispatch({
        type: NewsActionTypes.CHANGE_CURRENT_PAGE,
        payload: { currentPage: page },
      });

    // In case the current search term changed update the state
    if (currentSearchTerm !== searchTerm)
      dispatch({
        type: NewsActionTypes.SEARCH_TERM,
        payload: { searchTerm: searchTerm },
      });

    try {
      // Create the params for the Request
      const params = {
        q: searchTerm || '',
        withThumbnails: true,
        pageNumber: page,
        pageSize,
      };
      const resNewsList = await get(newsSearchUrl, params);

      // In case there is more than  the module of pageSize we need 1 more page to display the results
      const resTotalCountPages = Math.ceil(
        resNewsList.data.totalCount / pageSize
      );

      // In case the total pages changed update the state
      if (totalPages !== resTotalCountPages)
        dispatch({
          type: NewsActionTypes.CHANGE_TOTAL_PAGES,
          payload: { totalPages: resTotalCountPages },
        });

      // Update the state with the new news that were requested
      dispatch({
        type: NewsActionTypes.UPDATE_NEWS,
        payload: { newsList: resNewsList.data.value },
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(error);

      const errorMessage = handleErrorMessage(axiosError.response?.status);

      // Show the error component
      dispatch({ type: NewsActionTypes.SHOW_ERROR });

      // Update the error message
      dispatch({
        type: NewsActionTypes.ERROR_MESSAGE,
        payload: { errorMessage: errorMessage },
      });
    } finally {
      // Update the loading state after finishing all updates
      dispatch({ type: NewsActionTypes.LOADED });
    }
  };

  return (
    <NewsContext.Provider
      value={{
        isLoadingNews,
        newsList,
        currentPage,
        totalPages,
        currentSearchTerm,
        showErrorAlert,
        errorMessage,
        handleSearchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export default NewsContext;
