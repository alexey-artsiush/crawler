import React from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import './ArticleCard.scss';

export const ArticleCard = ({ article, onClick, onChange }) => {
  const date = DateTime.fromSQL(article.createdAt.slice(0, 10))
    .setLocale('en')
    .toFormat('LL/dd/yy');
  const time = DateTime.fromSQL(article.createdAt.slice(11, 16))
    .setLocale('en')
    .toFormat('hh:mm a');

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
          Alex &nbsp;
          {article.author}
          <div className="article-card__header-date">
            {date}
            <br />
            {time}
          </div>
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
          <span>{article.location}</span>
        </div>
        <div className="article-card__body-title">{article.title}</div>
        <div className="article-card__body-description">
          {article.description}
        </div>
        <div className="article-card__body-comments">
          <button className="article-card__body-button-left" type="button">
            {article.comments.length}
            &nbsp; comments
          </button>
          <input
            type="text"
            onChange={onChange}
            placeholder="Type you comment"
          />
          <button
            className="article-card__body-button-right"
            onClick={onClick}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
