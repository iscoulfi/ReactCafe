import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterSliceState = {
  categoryId: number;
  sort: string;
  value: string;
  currentPage: number;
};

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: 'популярности (убыв)',
  value: '',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setValue, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
