/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apartmentService from '../services/apartmentService';

export const getApartment = createAsyncThunk(
  'GET_APARTMENT',
  async (filter, thunkAPI) => {
    try {
      return await apartmentService.getApartment(filter);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getApartmentById = createAsyncThunk(
  'GET_APARTMENT_BY_ID',
  async (id, thunkAPI) => {
    try {
      return await apartmentService.getOneApartment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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

export const createApartment = createAsyncThunk(
  'CREATE_APARTMENT',
  async (data, thunkAPI) => {
    try {
      return await apartmentService.createApartment(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateApartment = createAsyncThunk(
  'UPDATE_APARTMENT',
  async (updateData, thunkAPI) => {
    try {
      return await apartmentService.updateApartment(updateData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePremiumStatus = createAsyncThunk(
  'UPDATE_APARTMENT_STATUS',
  async (data, thunkAPI) => {
    const { apartId, premium } = data;
    try {
      return await apartmentService.changePremiumStatus(apartId, premium);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState: {
    apartment: null,
    currentApartment: null,
    address: 'London, 221B Baker Street',
    page: 1,
    totalCount: 0,
    limit: 7,
    isLoading: false,
    message: null,
  },
  reducers: {
    setApartments: (state, action) => {
      state.apartment = action.payload;
    },
    setCurrentApartment: (state, action) => {
      state.currentApartment = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setPremium: (state) => {
      state.currentApartment.premium = !state.currentApartment.premium;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apartment = action.payload.apartments.rows;
        state.totalCount = action.payload.apartments.count;
      })
      .addCase(getApartment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.apartment = null;
      })

      .addCase(getApartmentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentApartment = {
          ...action.payload,
          files: action.payload.files.map((file) =>
            Object.assign(file, {
              id: Math.random() * Date.now(),
              preview: URL.createObjectURL(file),
            })
          ),
        };
      })
      .addCase(getApartmentById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.apartment = null;
      });
  },
});

export const selectApartment = (state) => {
  return state.apartment.apartment;
};
export const selectCurrentApartment = (state) => {
  return state.apartment.currentApartment;
};
export const selectApartmentLoading = (state) => {
  return state.apartment.isLoading;
};
export const selectLimitCards = (state) => {
  return state.apartment.limit;
};
export const selectCountResult = (state) => {
  return state.apartment.totalCount;
};
export const selectPremiumStatusApartment = (state) => {
  return state.apartment.currentApartment.premium;
};

export const {
  setCurrentApartment,
  setApartments,
  setUserApartment,
  setAddress,
  setPremium,
} = apartmentSlice.actions;
export default apartmentSlice.reducer;
