/* eslint-disable indent */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsCard } from '../NewsCard';
import paths from '../../utils/paths';
import './News.scss';

export const News = ({ news }) => {
  const navigate = useNavigate();
  return (
    <div className="news">
      <div
        className="news-header"
        role="presentation"
        onClick={() => {
          navigate(`${paths.news}`);
        }}
      >
        <h2>News</h2>
      </div>
      <div className="select-content-news">
        {news
          ? news.map((item) => {
              return (
                <NewsCard
                  item={item}
                  key={item.id}
                  title={item.title}
                  shortDescription={item.shortDescription}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};
