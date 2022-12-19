import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: 'популярности (убыв)',
  value: '',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setValue(state, action) {
      state.value = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setValue, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
