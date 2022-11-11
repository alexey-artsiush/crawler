/* eslint-disable import/no-named-as-default-member */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

export const getUserPhoto = createAsyncThunk(
  'GET_USER_PHOTO',
  async (img, thunkAPI) => {
    try {
      return await userService.getPhoto(img);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'UPDATE_USER',
  async (formDataUser, thunkAPI) => {
    try {
      return await userService.updateUser(formDataUser);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registrationUser = createAsyncThunk(
  'REGISTRATION_USER',
  async (user, thunkAPI) => {
    try {
      return await userService.registration(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'LOGIN_USER',
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'LOGOUT_USER',
  async (_, thunkAPI) => {
    try {
      return await userService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'CHECK_AUTH_USER',
  async (_, thunkAPI) => {
    try {
      return await userService.check();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isError = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isError = true;
      })

      .addCase(registrationUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload.message;
      });
  },
});

export const selectUser = (state) => {
  return state.user.user;
};

export const selectState = (state) => {
  return state.user.isAuth;
};

export const { setUser, setIsAuth, setLogout, setError } = userSlice.actions;
export default userSlice.reducer;
