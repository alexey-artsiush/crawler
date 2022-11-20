import React from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ArticleCard.scss';

export const ArticleCard = () => {
  return (
    <div className="article-card">
      <div className="article-card__header">
        <div className="article-card__header-user">
          <div className="article-card__header-photo">
            <img
              src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8d46d4ea-ce94-469a-81d8-6fd7bf0c1dd1/280x420"
              // src={`${process.env.REACT_APP_API_URL}/${user.img}`}
              alt="user"
            />
          </div>
          Alex
          {/* {user.firstName} */}
          &nbsp; Alexey
          {/* {user.lasName} */}
        </div>
        <div className="article-card__header-user-counts">
          <span>3 publications</span>
          <span>5 comments</span>
        </div>
      </div>
      <div className="article-card__body">
        <div className="dotter" />
        <div className="article-card__body-location">
          <FontAwesomeIcon icon={faMapMarker} />
          &nbsp;
          <span>Minsk</span>
        </div>
        <div className="article-card__body-title">My the lovest city</div>
        <div className="article-card__body-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, vitae!
        </div>
        <div className="article-card__body-comments">
          <button className="article-card__body-button-left" type="button">
            3 comments
          </button>
          <input type="text" placeholder="Type you comment" />
          <button className="article-card__body-button-right" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
