/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cityService from '../services/cityService';

export const getCity = createAsyncThunk('GET_CITY', async (_, thunkAPI) => {
  try {
    return await cityService.getCity();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const citySlice = createSlice({
  name: 'city',
  initialState: {
    city: [],
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.city = action.payload;
      })
      .addCase(getCity.rejected, (state) => {
        state.isLoading = false;
        state.city = null;
      });
  },
});

// eslint-disable-next-line semi, no-unused-expressions
export const selectCity = (state) => {
  return state.city.city;
};

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
