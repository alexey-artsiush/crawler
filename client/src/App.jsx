import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Apartment } from './pages/Apartment/Apartment';
import { Registr } from './pages/Registr/Registr';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { EditPage } from './pages/EditPage';
import { Search } from './pages/Search/Search';
import { PersonalAccount } from './pages/Personal/PersonalAccount';
import { check } from './store/services/userService';
import { setIsAuth, setUser } from './store/user/userSlice';
import { Spinner } from './components/Spinner';
import { News } from './pages/News';
import { NewsList } from './pages/NewsList';
import { CreateApartment } from './pages/Personal/PersonalCreateApartment';
import { PersonalObjects } from './pages/Personal/PersonalObjects';
import { CreateNews } from './pages/Personal/PersonalCreateNews';
import paths from './utils/paths';

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      check()
        .then((data) => {
          dispatch(setUser(data));
          dispatch(setIsAuth());
        }).finally(() => {
          setLoading(false);
        });
    }, 1000);
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path={paths.home}
        element={<Home />}
      />
      <Route
        path={paths.apartment}
        element={<Search />}
      />
      <Route
        path={`${paths.apartment}/:id`}
        element={<Apartment />}
      />
      <Route
        path={paths.auth}
        element={<Auth />}
      />
      <Route
        path={paths.registration}
        element={<Registr />}
      />
      <Route
        path={paths.personalAccount}
        element={<PersonalAccount />}
      />
      <Route
        path={`${paths.news}/:id`}
        element={<News />}
      />
      <Route
        path={paths.news}
        element={<NewsList />}
      />
      <Route
        path={paths.createApartment}
        element={<CreateApartment />}
      />
      <Route
        path={paths.personalObjects}
        element={<PersonalObjects />}
      />
      <Route
        path={paths.personalNews}
        element={<CreateNews />}
      />
      <Route
        path={`${paths.editPage}/:id`}
        element={<EditPage />}
      />
      <Route
        path="*"
        element={<Navigate to={paths.home} replace />}
      />
    </Routes>
  );
};

export default App;
