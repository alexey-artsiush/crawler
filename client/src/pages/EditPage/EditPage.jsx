/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import {
  getApartmentById,
  selectCurrentApartment,
} from '../../store/apartment/apartmentSlice';
import { selectState, selectUser } from '../../store/user/userSlice';
import { Spinner } from '../../components/Spinner';
import { EditApartmentForm } from '../../components/EditApartmentForm';
import './EditPage.scss';

export const EditPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.apartment.isLoading);
  const apartment = useSelector(selectCurrentApartment);
  const { id } = useParams();
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getApartmentById(id));
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      {loading || !apartment ? (
        <Spinner />
      ) : (
        <EditApartmentForm apartment={apartment} />
      )}
      <Footer />
    </div>
  );
};
