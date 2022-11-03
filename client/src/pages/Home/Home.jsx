import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectState, selectUser, setIsAuth, setUser } from '../../store/user/userSlice';
import { Header } from '../../components/Header';
import { Filter } from '../../components/Filter';
import { SelectCity } from '../../components/SelectCity';
import { Bestseller } from '../../components/Bestseller';
import { News } from '../../components/News';
import { Footer } from '../../components/Footer';
import { getNews, selectNews } from '../../store/news/newsSlice';
import { check } from '../../store/services/userService';
import { getPremiumApartment } from '../../store/apartment/apartmentSlice';
import { getCity, selectCity } from '../../store/city/citySlice';
import './Home.scss';

export const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const city = useSelector(selectCity);
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const [topApartment, setTopApartment] = useState([]);

  useEffect(() => {
    check()
      .then((data) => {
        dispatch(setUser(data));
        dispatch(setIsAuth());
      });
    dispatch(getPremiumApartment())
      .then((data) => {
        setTopApartment(data.payload.apartments.rows);
      });
    dispatch(getNews());
    dispatch(getCity());
  }, [dispatch]);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <Filter />
      <SelectCity cities={city} />
      <Bestseller topApartment={topApartment} />
      <News news={news} />
      <Footer />
    </div>
  );
};