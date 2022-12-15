import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendComment } from '../../store/chat/chatArticleSlice';
import { ArticleCard } from './ArticleCard/ArticleCard';
import './ListArticleCards.scss';

export const ListArticleCards = ({ articles }) => {
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const click = () => {
    dispatch(sendComment(message));
  };
  return (
    <div className="list-article-cards">
      {articles ? (
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            onChange={setMessage}
            article={article}
            onClick={click}
          />
        ))
      ) : (
        <h4>Here is clear</h4>
      )}
    </div>
  );
};
