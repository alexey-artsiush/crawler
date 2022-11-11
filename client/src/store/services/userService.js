/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// eslint-disable-next-line import/no-cycle
import { host, authHost } from './index';

const registration = async (user) => {
  const { data } = await host.post('/api/user/registration', user);
  localStorage.setItem('token', data.accessToken);
  return data;
};

const login = async (userData) => {
  const { email, password } = userData;
  const { data } = await authHost.post('/api/user/login', {
    email,
    password,
  });
  localStorage.setItem('token', data.accessToken);
  return jwtDecode(data.accessToken);
};

const logout = async () => {
  try {
    await authHost.post('/api/user/logout');
    localStorage.removeItem('token');
  } catch (e) {
    console.log(e.response);
  }
};

const check = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/refresh`,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user;
  } catch (e) {
    console.log(e.response);
  }
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

export { registration, login, check, logout, getPhoto, updateUser };

const userService = {
  registration,
  login,
  check,
  logout,
  getPhoto,
  updateUser,
};

export default userService;
