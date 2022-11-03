/* eslint-disable import/no-named-as-default-member */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

export const getUserPhoto = createAsyncThunk('GET_USER_PHOTO', async (img, thunkAPI) => {
  try {
    return await userService.getPhoto(img);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk('UPDATE_USER', async (formDataUser, thunkAPI) => {
  try {
    return await userService.updateUser(formDataUser);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logoutUser = createAsyncThunk('LOGOUT_USER', async (_, thunkAPI) => {
  try {
    return await userService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  user: {
  },
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuth: (state) => {
      state.isAuth = true;
    },
    setLogout: (state) => {
      state.user = {
      };
      state.isAuth = false;
    },
  },
});

export const selectUser = (state) => {
  return state.user.user;
};

export const selectState = (state) => {
  return state.user.isAuth;
};

export const { setUser, setIsAuth, setLogout } = userSlice.actions;
export default userSlice.reducer;
