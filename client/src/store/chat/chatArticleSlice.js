/* eslint-disable no-empty-pattern */
/* eslint-disable object-curly-newline */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from '../services/chatService';

export const getArticle = createAsyncThunk(
  'GET_ARTICLE',
  async (chatId, thunkAPI) => {
    try {
      return await chatService.getArticle(chatId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createArticle = createAsyncThunk(
  'CREATE_ARTICLE',
  async (formData, thunkAPI) => {
    try {
      return await chatService.createArticle(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendComment = createAsyncThunk(
  'SEND_COMMENT',
  async (commentData, thunkAPI) => {
    try {
      return await chatService.sendComment(commentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    article: null,
    currentArticle: null,
    isLoading: false,
    message: null,
  },
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.article = action.payload.rows;
        state.totalCount = action.payload.count;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.article = null;
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

export const { setArticle } = chatSlice.actions;
export default chatSlice.reducer;
