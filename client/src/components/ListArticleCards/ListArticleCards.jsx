import React from 'react';
import { ArticleCard } from './ArticleCard/ArticleCard';
import './ListArticleCards.scss';

export const ListArticleCards = ({ articles }) => {
  console.log(articles);
  return (
    <div className="list-article-cards">
      {articles ? (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <h4>Here is clear</h4>
      )}
    </div>
  );
};
