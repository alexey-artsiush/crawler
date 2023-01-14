/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { CommentCard } from './CommentCard/CommentCard';
import './ListComments.scss';

export const ListComments = ({ comments }) => {
  return (
    <div className="list-comment-cards">
      {comments || comments?.length > 0
        ? comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
        : ' '}
    </div>
  );
};
