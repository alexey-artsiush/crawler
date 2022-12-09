/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import apartmentSlice from './apartment/apartmentSlice';
import premiumApartmentSlice from './premiumApartment/premiumApartmentSlice';
import userApartmentSlice from './userApartment/userApartmentSlice';
import filterSlice from './filter/filterSlice';
import userSlice from './user/userSlice';
import newsSlice from './news/newsSlice';
import citySlice from './city/citySlice';
import chatArticleSlice from './chat/chatArticleSlice';

const store = configureStore({
  reducer: {
    chat: chatArticleSlice,
    user: userSlice,
    filter: filterSlice,
    apartment: apartmentSlice,
    premiumApartment: premiumApartmentSlice,
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
