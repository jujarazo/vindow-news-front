import { NewsCard } from './NewsCard';
import { News } from './types';

export type NewsContainerProps = {
  newsList: News[];
};

export function NewsContainer({ newsList }: NewsContainerProps) {
  return (
    <div className="container">
      <div className="row g-4 mb-3">
        {newsList &&
          newsList.map((news) => <NewsCard news={news} key={news.id} />)}
      </div>
    </div>
  );
}
