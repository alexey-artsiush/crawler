import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Cover } from '../../components/Cover';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { PropertyBlock } from '../../components/PropertyBlock';
import { selectCurrentNews } from '../../store/news/newsSlice';
import { selectState, selectUser } from '../../store/user/userSlice';
import './News.scss';

export const News = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const news = useSelector(selectCurrentNews);
  const dateCreate = news.createdAt.slice(0, 10);
  const timeCreate = news.createdAt.slice(11, 16);

  return (
    <div className="">
      <Header isAuth={isAuth} user={user} />
      <PropertyBlock />
      <div className="news-list">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="orange"
        >
          {'< Back'}
        </Button>
        <div className="news-list-title">
          <h4>{news.title}</h4>
          <span>{` ${dateCreate} ${timeCreate}`}</span>
        </div>
        <Cover size="m" image={news.img} />
        {news.description}
      </div>
      <Footer />
    </div>
  );
};
