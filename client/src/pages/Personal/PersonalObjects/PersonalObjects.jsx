/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuth,
  selectState,
  selectUser,
} from '../../../store/user/userSlice';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Spinner } from '../../../components/Spinner';
import { Navigation } from '../../../components/Navigation';
import { SearchResult } from '../../../components/SearchResult';
import {
  getApartmentByUserId,
  selectCountUserResult,
} from '../../../store/userApartment/userApartmentSlice';
import paths from '../../../utils/paths';
import '../Personal.scss';

export const PersonalObjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const countResult = useSelector(selectCountUserResult);
  const { userApartment } = useSelector((state) => state.userApartment);
  const { isLoading } = useSelector((state) => state.userApartment);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    } else if (!user) {
      navigate(paths.home);
    }
    if (user) {
      dispatch(getApartmentByUserId(user.id));
    }
  }, [dispatch]);

  if (isLoading || !user) return <Spinner />;

  return (
    <div className="personal-account">
      <Header isAuth={isAuth} user={user} />
      <div className="personal-account-wrapper">
        <Navigation user={user} />
        <div className="personal-account-content">
          {isLoading ? (
            <Spinner />
          ) : (
            <SearchResult count={countResult} apartment={userApartment} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PersonalObjects;
