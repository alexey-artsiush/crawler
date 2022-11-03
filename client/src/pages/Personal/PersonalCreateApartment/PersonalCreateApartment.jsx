import React from 'react';
import { useSelector } from 'react-redux';
import { CreateApartmentForm } from '../../../components/CreateApartmentForm/CreateApartmentForm';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { selectState, selectUser } from '../../../store/user/userSlice';
import '../Personal.scss';

export const CreateApartment = () => {
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <CreateApartmentForm />
      <Footer />
    </div>
  );
};
