import { createContext, useState } from 'react';
import { News } from '../components';
import { results } from '../dummy';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
  const [showErrorAlert, setShowErrorAlert] = useState(true);
  const [errorMessage, setErrorMessage] = useState(
    'There seems to be an error'
  );

  const handleSearchNews = async (searchTerm: string, page: number) => {
    setIsLoadingNews(true);

    if (currentPage !== page) setCurrentPage(page);
    if (currentSearchTerm !== searchTerm) setCurrentSearchTerm(searchTerm);

    try {
      // Call API
      await sleep(600);
      console.log(searchTerm, page);
      setNewsList(results.value);
    } catch (error) {
      console.error(error);
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
