import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    location: '',
    rooms: '',
    rentalPeriod: '',
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
  },
});

export const selectFilter = (state) => {
  return state.filter;
};

export const
  {
    setFilterLocation,
    setFilterRooms,
    setFilterRange,
    setFilterLease,
  } = filterSlice.actions;

export default filterSlice.reducer;
