import { useContext } from 'react';
import { truncateDescriptionAt, truncateTitleAt } from '../../constants';
import PopupContext from '../../context/PopupContext';
import { truncate } from '../../helpers';
import { News } from './types';

type NewsProp = {
  news: News;
};

export function NewsCard({ news }: NewsProp) {
  const { handleShowPopup } = useContext(PopupContext);

  const truncatedTitle = truncate(news.title, truncateTitleAt);

  const truncatedDescription = truncate(
    news.body || news.description,
    truncateDescriptionAt
  );

  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{truncatedTitle}</h5>
          <div className="image" role="button">
            <img
              onClick={() => handleShowPopup(news.image.url)}
              className="rounded cover"
              src={
                news.image.thumbnail.length
                  ? news.image.thumbnail
                  : '/no-image-available.png'
              }
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
