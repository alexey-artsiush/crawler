/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/userSlice';
import { Header } from '../../components/Header';
import { Filter } from '../../components/Filter';
import { SelectCity } from '../../components/SelectCity';
import { Bestseller } from '../../components/Bestseller';
import { News } from '../../components/News';
import { Footer } from '../../components/Footer';
import { getNews, selectNews } from '../../store/news/newsSlice';
import { getCity, selectCity } from '../../store/city/citySlice';
import { getPremiumApartment } from '../../store/premiumApartment/premiumApartmentSlice';
import './Home.scss';
import { SelectCityChat } from '../../components/SelectCityChat/SelectCityChat';

export const Home = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const city = useSelector(selectCity);
  const user = useSelector(selectUser);
  const topApartment = useSelector(
    (state) => state.premiumApartment.premiumApartment
  );

  useEffect(() => {
    dispatch(getPremiumApartment());
    dispatch(getNews());
    dispatch(getCity());
  }, [dispatch]);

  return (
    <div>
      <Header user={user} />
      <Filter />
      <SelectCity cities={city} />
      <Bestseller topApartment={topApartment} />
      <SelectCityChat cities={city} />
      <News news={news} />
      <Footer />
    </div>
  );
};
