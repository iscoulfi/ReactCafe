import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',

  async (params, thunkAPI) => {
    const { search, currentPage, categoryId, sort, value } = params;
    const { data } = await axios.get(
      `https://6395815690ac47c6806c6eaa.mockapi.io/Menu?page=${currentPage}&limit=8&${
        categoryId === 0 ? '' : `category=${categoryId}`
      }&${value === '' ? '' : search}&sortBy=${
        /популярности/.test(sort) ? 'rating' : 'price'
      }&order=${/возраст/.test(sort) ? 'asc' : 'desc'}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: 'loading', //loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'succes';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
