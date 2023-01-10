import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { getArticle, sendComment } from '../../../store/chat/chatArticleSlice';
import { selectUser } from '../../../store/user/userSlice';
import { ListComments } from '../../ListComments/ListComments';
import './ArticleCard.scss';

export const ArticleCard = ({ article }) => {
  const date = DateTime.fromSQL(article.createdAt.slice(0, 10))
    .setLocale('en')
    .toFormat('LL/dd/yy');
  const time = DateTime.fromSQL(article.createdAt.slice(11, 16))
    .setLocale('en')
    .toFormat('hh:mm a');

  const [text, setText] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const submitComment = async () => {
    try {
      const commentData = {
        userId: user.id,
        text,
        articleId: article.id,
        location: article.location,
      };
      await dispatch(sendComment(commentData));
      await dispatch(getArticle());
      setText('');
    } catch (e) {
      console.log(e);
    }
  };

  const showComments = () => {};

  return (
    <div className="article-card">
      <div className="article-card__header">
        <div className="article-card__header-user">
          <div className="article-card__header-photo">
            <img
              src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8d46d4ea-ce94-469a-81d8-6fd7bf0c1dd1/280x420"
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
        <ListComments comments={article.comments} />
        <div className="article-card__body-comments">
          <button
            className="article-card__body-button-left"
            onClick={() => showComments()}
            type="button"
          >
            {article.comments.length}
            &nbsp; comments
          </button>
          <input
            type="text"
            placeholder="Type you comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="article-card__body-button-right"
            onClick={() => submitComment(user, text)}
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
