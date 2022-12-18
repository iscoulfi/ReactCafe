import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setSort } from './redux/slices/filterSlice';

import axios from 'axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

export const CSContext = React.createContext({});

function App() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const search = value ? `search=${value}` : '';

        const { data } = await axios.get(
          `https://6395815690ac47c6806c6eaa.mockapi.io/Menu?page=${currentPage}&limit=8&${
            categoryId === 0 ? '' : `category=${categoryId}`
          }&${value === '' ? '' : search}&sortBy=${
            /популярности/.test(sort) ? 'rating' : 'price'
          }&order=${/возраст/.test(sort) ? 'asc' : 'desc'}`
        );

        setMenu(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [categoryId, sort, value, currentPage]);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (el) => {
    dispatch(setSort(el));
  };

  return (
    <BrowserRouter>
      <CSContext.Provider
        value={{ onClickCategory, sort, onClickSort, value, setValue }}
      >
        <div className="App">
          <div className="wrapper">
            <Header />
            <div className="content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      menu={menu}
                      isLoading={isLoading}
                      setCurrentPage={setCurrentPage}
                    />
                  }
                />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </div>
      </CSContext.Provider>
    </BrowserRouter>
  );
}

export default App;
