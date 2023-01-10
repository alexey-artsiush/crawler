import React from 'react';
import { DateTime } from 'luxon';
import { Cover } from '../../Cover';
import './CommentCard.scss';

export const CommentCard = ({ comment }) => {
  const date = DateTime.fromSQL(comment.createdAt.slice(0, 10))
    .setLocale('en')
    .toFormat('LL/dd/yy');
  const time = DateTime.fromSQL(comment.createdAt.slice(11, 16))
    .setLocale('en')
    .toFormat('hh:mm a');

  return (
    <div className="comment-card">
      <div className="comment-card__img">
        <Cover size="xxs" image="0a2861e5-b173-41a7-8582-5175ee1b84d3.jpeg" />
      </div>
      <div className="comment-card__content">
        <div className="comment-card__author-name">{comment.userName}</div>
        <div className="comment-card__text">{comment.text}</div>
        <div className="comment-card__header-date">
          {date}
          &nbsp;
          {time}
        </div>
        <div className="line" />
      </div>
    </div>
  );
};
