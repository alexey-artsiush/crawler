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
  const [isDisplayComments, setIsDisplayComments] = useState(false);
  console.log(isDisplayComments);
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

  return (
    <div className="article-card">
      <div className="article-card__header">
        <div className="article-card__header-user">
          <div className="article-card__header-photo">
            <img
              src={`${process.env.REACT_APP_API_URL}/${article.user.img}`}
              alt="user"
            />
          </div>
          {article.user.firstName}
          &nbsp;
          {article.user.lastName}
          <div className="article-card__header-date">
            {date}
            <br />
            {time}
          </div>
        </div>

        <div className="article-card__header-user-counts">
          <span>
            {article.user.articles.length}
            &nbsp;
            posts
          </span>
          <span>
            {article.user.comments.length}
            &nbsp;
            comments
          </span>
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
        {isDisplayComments ? <ListComments comments={article.comments} /> : null}
        <div className="article-card__body-comments">
          <button
            className="article-card__body-button-left"
            onClick={() => setIsDisplayComments(!isDisplayComments)}
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
