import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NewsCard } from '../../components/NewsCard';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { PropertyBlock } from '../../components/PropertyBlock';
import { getNews, selectNews } from '../../store/news/newsSlice';
import { Button } from '../../components/Button';
import { selectState, selectUser } from '../../store/user/userSlice';
import './NewsList.scss';

export const NewsList = () => {
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const news = useSelector(selectNews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <PropertyBlock />
      <div className="news-list-button">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="orange"
        >
          {'< Back'}
        </Button>
      </div>
      <div className="news-list">
        {news ? (
          news.map((item) => {
            return (
              <NewsCard data-testid="news-item" item={item} key={item.id} />
            );
          })
        ) : (
          <h4>No news today... Come back tomorrow</h4>
        )}
      </div>
      <Footer />
    </div>
  );
};
