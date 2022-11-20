import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Apartment } from './pages/Apartment/Apartment';
import { Registr } from './pages/Registr/Registr';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { EditPage } from './pages/EditPage';
import { Search } from './pages/Search/Search';
import { PersonalAccount } from './pages/Personal/PersonalAccount';
import { News } from './pages/News';
import { NewsList } from './pages/NewsList';
import { CreateApartment } from './pages/Personal/PersonalCreateApartment';
import { PersonalObjects } from './pages/Personal/PersonalObjects';
import { CreateNews } from './pages/Personal/PersonalCreateNews';
import { checkAuth } from './store/user/userSlice';
import { Chat } from './pages/Chat';
import paths from './utils/paths';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.apartment} element={<Search />} />
      <Route path={`${paths.apartment}/:id`} element={<Apartment />} />
      <Route path={paths.auth} element={<Auth />} />
      <Route path={paths.registration} element={<Registr />} />
      <Route path={paths.personalAccount} element={<PersonalAccount />} />
      <Route path={`${paths.news}/:id`} element={<News />} />
      <Route path={paths.news} element={<NewsList />} />
      <Route path={paths.createApartment} element={<CreateApartment />} />
      <Route path={paths.personalObjects} element={<PersonalObjects />} />
      <Route path={paths.personalNews} element={<CreateNews />} />
      <Route path={`${paths.editPage}/:id`} element={<EditPage />} />
      <Route path={`${paths.chat}/:chatId`} element={<Chat />} />
      <Route path="*" element={<Navigate to={paths.home} replace />} />
    </Routes>
  );
};

export default App;
