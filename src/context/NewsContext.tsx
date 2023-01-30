import { createContext, useState } from 'react';
import { News } from '../components';
import { results } from '../dummy';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type NewsContextType = {
  newsList: News[];
  currentPage: number;
  handleSearchNews: (searchTerm: string, page: number) => void;
};

const NewsContext = createContext<NewsContextType>({} as NewsContextType);

export function NewsProvider({ children }: { children: JSX.Element }) {
  const [newsList, setNewsList] = useState(results.value);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchNews = async (searchTerm: string, page: number) => {
    if (currentPage !== page) setCurrentPage(page);
    try {
      // Call API
      await sleep(600);
      console.log(searchTerm);
      setNewsList(results.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewsContext.Provider value={{ newsList, currentPage, handleSearchNews }}>
      {children}
    </NewsContext.Provider>
  );
}

export default NewsContext;
