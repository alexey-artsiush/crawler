import React from 'react';
import { ArticleCard } from './ArticleCard/ArticleCard';
import './ListArticleCards.scss';

export const ListArticleCards = () => {
  return (
    <div className="list-article-cards">
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
    </div>
  );
};
