import { useContext } from 'react';
import PopupContext from '../../context/PopupContext';
import { truncate } from '../../helpers';
import { News } from './types';

type NewsProp = {
  news: News;
};

export function NewsCard({ news }: NewsProp) {
  const { handleShowPopup } = useContext(PopupContext);

  const truncatedTitle = truncate(news.title, 10);

  const truncatedDescription = truncate(news.description, 20);

  return (
    <div className="col-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{truncatedTitle}</h5>
          <div className="card-image" role="button">
            <img
              height={200}
              width={350}
              onClick={() => handleShowPopup(news.image.url)}
              className="rounded"
              src={news.image.thumbnail}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="card-text mt-2">{truncatedDescription}</p>
        </div>
        <div className="d-flex justify-content-end w-100 p-3">
          <a href={news.url} target="_blank">
            Read more...
          </a>
        </div>
      </div>
    </div>
  );
}
