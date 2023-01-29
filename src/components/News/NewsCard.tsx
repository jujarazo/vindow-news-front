import { useContext } from 'react';
import PopupContext from '../../context/PopupContext';
import { News } from './types';

type NewsProp = {
  news: News;
};

export function NewsCard({ news }: NewsProp) {
  const { handleShowPopup } = useContext(PopupContext);

  return (
    <div className="col-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{news.title}</h5>
          <div className="card-image">
            <img
              height={200}
              width={350}
              onClick={() => handleShowPopup(news.image.url)}
              className="rounded"
              src={news.image.thumbnail}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="card-text mt-2">{news.description}</p>
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
