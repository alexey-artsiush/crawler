/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectApartment,
  getApartment,
  selectApartmentLoading,
  selectLimitCards,
  selectCountResult,
} from '../../store/apartment/apartmentSlice';
import { Button } from '../../components/Button';
import { Filter } from '../../components/Filter';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { SearchResult } from '../../components/SearchResult';
import { selectState, selectUser } from '../../store/user/userSlice';
import { Spinner } from '../../components/Spinner';
import { selectFilter } from '../../store/filter/filterSlice';
import { Pagination } from '../../components/Pagination';
import './Search.scss';

export const Search = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const apartment = useSelector(selectApartment);
  const countResult = useSelector(selectCountResult);
  const isLoading = useSelector(selectApartmentLoading);
  const filter = useSelector(selectFilter);
  const [city] = useState(filter.location);
  const [leavingRoom] = useState(filter.leavingRoom);
  const [rentalPeriod] = useState(filter.rentalPeriod);
  const [minPrice] = useState(filter.minPrice);
  const [maxPrice] = useState(filter.maxPrice);

  useEffect(() => {
    dispatch(
      getApartment({
        city,
        leavingRoom,
        rentalPeriod,
        minPrice,
        maxPrice,
      })
    );
  }, [city, leavingRoom, rentalPeriod, minPrice, maxPrice]);

  const [currentPage, setCurrentPage] = useState(1);
  const limitPerPage = useSelector(selectLimitCards);
  const lastItemUndex = currentPage * limitPerPage;
  const firstItemUndex = lastItemUndex - limitPerPage;
  const currentApartment = apartment?.slice(firstItemUndex, lastItemUndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((pageNumber) => pageNumber + 1);
  const prevPage = () => setCurrentPage((pageNumber) => pageNumber - 1);

  return (
    <div>
      <Header isAuth={isAuth} user={user}>
        <Button type="clear">Register</Button>
        <Button type="clear">Sign in</Button>
      </Header>
      <Filter />
      {isLoading ? (
        <Spinner />
      ) : (
        <SearchResult count={countResult} apartment={currentApartment} />
      )}
      <Pagination
        itemsPerPage={limitPerPage}
        totalItems={apartment?.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
      />
      <Footer />
    </div>
  );
};
