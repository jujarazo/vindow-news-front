import { createContext, useState } from 'react';
import { News } from '../components';
import { results } from '../dummy';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type NewsContextType = {
  newsList: News[];
  currentPage: number;
  currentSearchTerm: string;
  handleSearchNews: (searchTerm: string, page: number) => void;
};

const NewsContext = createContext<NewsContextType>({} as NewsContextType);

export function NewsProvider({ children }: { children: JSX.Element }) {
  const [newsList, setNewsList] = useState(results.value);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  const handleSearchNews = async (searchTerm: string, page: number) => {
    if (currentPage !== page) setCurrentPage(page);
    if (currentSearchTerm !== searchTerm) setCurrentSearchTerm(searchTerm);
    try {
      // Call API
      await sleep(600);
      console.log(searchTerm, page);
      setNewsList(results.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewsContext.Provider
      value={{ newsList, currentPage, currentSearchTerm, handleSearchNews }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export default NewsContext;
