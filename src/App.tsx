import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchPizzas } from './redux/slices/pizzaSlice';
import { useAppDispatch } from './redux/store';

import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

function App() {
  const dispatch = useAppDispatch();

  const categoryId: number = useSelector(
    (state: any) => state.filter.categoryId
  );
  const sort: string = useSelector((state: any) => state.filter.sort);
  const value: string = useSelector((state: any) => state.filter.value);
  const currentPage: number = useSelector(
    (state: any) => state.filter.currentPage
  );
  const { items }: { items: string[] } = useSelector(
    (state: any) => state.pizza
  );

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
              <Route path="/ReactCafe" element={<Home menu={items} />} />
              <Route path="/ReactCafe/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
