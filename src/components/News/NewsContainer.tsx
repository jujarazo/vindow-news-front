import { useContext } from 'react';
import NewsContext from '../../context/NewsContext';
import { NewsCard } from './NewsCard';

export function NewsContainer() {
  const { newsList } = useContext(NewsContext);

  return (
    <div className="container">
      <div className="row g-4 mb-3">
        {newsList.length ? (
          newsList.map((news) => <NewsCard news={news} key={news.id} />)
        ) : (
          <div className="d-flex justify-content-center">
            There seems to be no Results for the current search
          </div>
        )}
      </div>
    </div>
  );
}
