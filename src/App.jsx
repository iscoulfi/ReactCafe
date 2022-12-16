import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

export const CSContext = React.createContext({});

function App() {
  const [categorySort, setCategorySort] = useState(0);
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortValue, setSortValue] = useState('популярности (убыв)');
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const search = value ? `search=${value}` : '';

        const { data } = await axios.get(
          `https://6395815690ac47c6806c6eaa.mockapi.io/Menu?page=${currentPage}&limit=8&${
            categorySort === 0 ? '' : `category=${categorySort}`
          }&${value === '' ? '' : search}&sortBy=${
            /популярности/.test(sortValue) ? 'rating' : 'price'
          }&order=${/возраст/.test(sortValue) ? 'asc' : 'desc'}`
        );

        setMenu(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [categorySort, sortValue, value, currentPage]);

  return (
    <BrowserRouter>
      <CSContext.Provider
        value={{ setCategorySort, sortValue, setSortValue, value, setValue }}
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
