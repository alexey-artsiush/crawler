import jwtDecode from 'jwt-decode';
import { authHost, host } from './index';

const registration = async (user) => {
  const { data } = await host.post('/api/user/registration', user);
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const login = async (email, password) => {
  const { data } = await host.post('/api/user/login', {
    email, password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const logout = async () => {
  localStorage.removeItem('token');
};

const check = async () => {
  const { data } = await authHost.get('/api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

const updateUser = async (formDataUser) => {
  const { user } = await host.put('/api/user/update', formDataUser);
  return user;
};

const getPhoto = async (img) => {
  const photo = await host.get('/api/files/download', {
    params: {
      img,
    },
  });
  return photo;
};

export {
  registration, login, check, logout, getPhoto, updateUser
};

const userService = {
  registration,
  login,
  check,
  logout,
  getPhoto,
  updateUser,
};

export default userService;
