/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    location: '',
    rooms: '',
    rentalPeriod: '',
    minPrice: '',
    maxPrice: '',
  },
  reducers: {
    setFilterLocation: (state, action) => {
      state.location = action.payload;
    },
    setFilterRooms: (state, action) => {
      state.rooms = action.payload;
    },
    setFilterLease: (state, action) => {
      state.rentalPeriod = action.payload;
    },
    setFilterMinPrice: (state, action) => {
      state.rentalPeriod = action.payload;
    },
    setFilterMaxPrice: (state, action) => {
      state.rentalPeriod = action.payload;
    },
  },
});

export const selectFilter = (state) => {
  return state.filter;
};

export const {
  setFilterLocation,
  setFilterRooms,
  setFilterLease,
  setFilterRange,
  setFilterMinPrice,
  setFilterMaxPrice,
} = filterSlice.actions;

export default filterSlice.reducer;
