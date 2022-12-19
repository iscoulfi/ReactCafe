import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

function App() {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const value = useSelector((state) => state.filter.value);
  const currentPage = useSelector((state) => state.filter.currentPage);

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

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Home menu={menu} isLoading={isLoading} />}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
