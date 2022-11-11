/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import apartmentSlice from './apartment/apartmentSlice';
import userApartmentSlice from './userApartment/userApartmentSlice';
import filterSlice from './filter/filterSlice';
import userSlice from './user/userSlice';
import newsSlice from './news/newsSlice';
import citySlice from './city/citySlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    filter: filterSlice,
    apartment: apartmentSlice,
    userApartment: userApartmentSlice,
    news: newsSlice,
    city: citySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
