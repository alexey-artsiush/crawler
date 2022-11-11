import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkAuth, selectUser } from '../../../store/user/userSlice';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Navigation } from '../../../components/Navigation';
import { Spinner } from '../../../components/Spinner';
import { UserPersonalForm } from '../../../components/UserPersonalForm/UserPersonalForm';
import paths from '../../../utils/paths';
import '../Personal.scss';

export const PersonalAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    } else if (!user) {
      navigate(paths.home);
    }
  }, []);

  if (!user) {
    return <Spinner />;
  }

  return (
    <div className="personal-account">
      <Header user={user} />
      <div className="personal-account-wrapper">
        {user.isActivated ? (
          <>
            <Navigation user={user} />
            <UserPersonalForm user={user} />
          </>
        ) : (
          <h1 className="activate-message">
            Check your mail and activate your account
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
};
