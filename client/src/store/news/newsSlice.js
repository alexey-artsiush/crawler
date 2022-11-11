/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newsService from '../services/newsService';

export const getNews = createAsyncThunk('GET_NEWS', async (_, thunkAPI) => {
  try {
    return await newsService.getNews();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createNews = createAsyncThunk(
  'CREATE_NEWS',
  async (data, thunkAPI) => {
    try {
      return await newsService.createNews(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    currentNews: {},
    isError: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setCurrentNews: (state, action) => {
      state.currentNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
        state.news = null;
      });
  },
});

export const selectNews = (state) => {
  return state.news.news;
};
export const selectCurrentNews = (state) => {
  return state.news.currentNews;
};

export const { setCurrentNews, setNews } = newsSlice.actions;
export default newsSlice.reducer;
