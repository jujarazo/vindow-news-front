import { News } from './types';

type NewsProp = {
  news: News;
};

export function NewsCard({ news }: NewsProp) {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{news.title}</h5>
          <img src={news.image.thumbnail} className="card-img" />
          <p className="card-text mt-2">{news.description}</p>
          <div className="d-flex justify-content-end w-100">
            <a href={news.url} target="_blank">
              Read more...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
