import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas } from './redux/slices/pizzaSlice';

import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

function App() {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const value = useSelector((state) => state.filter.value);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items } = useSelector((state) => state.pizza);

  useEffect(() => {
    (async () => {
      //перенесли в redux
      const search = value ? `search=${value}` : '';
      dispatch(fetchPizzas({ search, currentPage, categoryId, sort, value }));
    })();
  }, [categoryId, sort, value, currentPage]);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home menu={items} />} />
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
