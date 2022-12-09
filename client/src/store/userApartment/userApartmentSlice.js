/* eslint-disable operator-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apartmentService from '../services/apartmentService';

export const getApartmentByUserId = createAsyncThunk(
  'GET_USER_APARTMENT',
  async (userId, thunkAPI) => {
    try {
      return await apartmentService.getApartmentByUserId(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const apartmentSlice = createSlice({
  name: 'user-aoartment',
  initialState: {
    userApartment: null,
    page: 1,
    totalCount: 0,
    limit: 10,
    isLoading: false,
  },
  reducers: {
    setUserApartments: (state, action) => {
      state.apartment = action.payload;
    },
    setCurrentApartment: (state, action) => {
      state.currentApartment = action.payload;
    },
    setUserApartment: (state, action) => {
      state.userApartment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApartmentByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApartmentByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userApartment = action.payload.apartments.rows;
        state.totalCount = action.payload.apartments.count;
      })
      .addCase(getApartmentByUserId.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload.message;
        state.userApartment = null;
      });
  },
});

export const selectUserApartment = (state) => {
  return state.userApartment.userApartment;
};
export const selectUserApartmentLoading = (state) => {
  return state.userApartment.isLoading;
};
export const selectCountUserResult = (state) => {
  return state.userApartment.totalCount;
};

export const { setCurrentApartment, setApartments, setUserApartment } =
  apartmentSlice.actions;
export default apartmentSlice.reducer;
