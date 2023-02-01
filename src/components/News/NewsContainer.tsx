import { useContext, useEffect } from 'react';
import NewsContext from '../../context/NewsContext';
import { NewsCard } from './NewsCard';

export function NewsContainer() {
  const { newsList, handleSearchNews, currentPage, currentSearchTerm } =
    useContext(NewsContext);

  useEffect(() => {
    handleSearchNews(currentSearchTerm, currentPage);
  }, []);

  return (
    <div className="container">
      <div className="row g-4 mb-3">
        {newsList &&
          newsList.map((news) => <NewsCard news={news} key={news.id} />)}
      </div>
    </div>
  );
}
