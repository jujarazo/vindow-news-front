import { AxiosError } from 'axios';
import { createContext, useState } from 'react';
import { News } from '../components';
import { results } from '../dummy';
import { get } from '../service/http';

const newsSearchUrl = '/api/search/NewsSearchAPI';

const pageSize = 6;

export type NewsContextType = {
  isLoadingNews: boolean;
  newsList: News[];
  currentPage: number;
  currentSearchTerm: string;
  showErrorAlert: boolean;
  errorMessage: string;
  handleSearchNews: (searchTerm: string, page: number) => void;
};

const NewsContext = createContext<NewsContextType>({} as NewsContextType);

export function NewsProvider({ children }: { children: JSX.Element }) {
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [newsList, setNewsList] = useState(results.value);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    'There seems to be an error'
  );

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
      setNewsList(resNewsList.data.value);
    } catch (error) {
      const errorMessage = error as AxiosError;
      console.error(error);
      setShowErrorAlert(true);
      setErrorMessage(errorMessage.message);
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
