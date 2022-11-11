import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cover } from '../Cover';
import { Button } from '../Button';
import { setCurrentNews } from '../../store/news/newsSlice';
import paths from '../../utils/paths';
import './NewsCard.scss';

export const NewsCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigate(`${paths.news}/${item.id}`);
    dispatch(setCurrentNews(item));
  };
  return (
    <div className="select-one">
      <div className="news-card" onClick={handleClick} aria-hidden="true">
        <Cover image={item.img} />
        <div className="news-card-header">
          <div className="news-title">{item.title}</div>
        </div>
        <div className="news-card-body">
          <div className="news-short-description">{item.description}</div>
          <div className="news-card-wrapper">
            <Button size="s" type="blue">
              Read more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
