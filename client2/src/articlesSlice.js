import { createSlice } from '@reduxjs/toolkit';

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    hashes: [],
    articles: [],
  },
  reducers: {
    addHashes: (state, action) => {
      state.hashes = action.payload;
    },
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
  },
});

export const { addHashes, addArticle } = articlesSlice.actions;

export default articlesSlice.reducer;