/* eslint-disable no-empty-pattern */
/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apartmentService from '../services/apartmentService';

export const getPremiumApartment = createAsyncThunk(
  'GET_PREMIUM_APARTMENT',
  async (_, thunkAPI) => {
    try {
      return await apartmentService.getPremiumApartment();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const premiumApartmentSlice = createSlice({
  name: 'premium apartment',
  initialState: {
    premiumApartment: null,
    page: 1,
    totalCount: 0,
    limit: 10,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPremiumApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPremiumApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.premiumApartment = action.payload.apartments.rows;
        state.totalCount = action.payload.apartments.count;
      })
      .addCase(getPremiumApartment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.premiumApartment = null;
      });
  },
});

export const {} = premiumApartmentSlice.actions;
export default premiumApartmentSlice.reducer;
