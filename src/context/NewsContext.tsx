import { AxiosError } from 'axios';
import { createContext, useState } from 'react';
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

export function NewsProvider({ children }: { children: JSX.Element }) {
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchNews = async (searchTerm: string, page: number) => {
    setIsLoadingNews(true);

    if (currentPage !== page) setCurrentPage(page);
    if (currentSearchTerm !== searchTerm) setCurrentSearchTerm(searchTerm);

    try {
      // Create the params for the Request
      const params = {
        q: searchTerm || '',
        withThumbnails: true,
        pageNumber: page,
        pageSize,
      };
      const resNewsList = await get(newsSearchUrl, params);
      const resTotalCountPages = Math.ceil(
        resNewsList.data.totalCount / pageSize
      );

      if (totalPages !== resTotalCountPages) setTotalPages(resTotalCountPages);
      setNewsList(resNewsList.data.value);
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(error);

      const errorMessage = handleErrorMessage(axiosError.response?.status);
      setShowErrorAlert(true);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoadingNews(false);
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
