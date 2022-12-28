import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

type fetchPizzasArts = {
  search: string;
  currentPage: number;
  categoryId: number;
  sort: string;
  value: string;
};
type Pizza = {
  id: string;
  imageUrl: string;
  name: string;
  types: number[];
  sizes: number[];
  price: number;
};

export const fetchPizzas = createAsyncThunk<Pizza[], fetchPizzasArts>(
  'pizza/fetchPizzasStatus',

  async (params) => {
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

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | succes | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<Pizza[]>) => {
        state.status = Status.SUCCES;
        state.items = action.payload;
      }
    );

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
