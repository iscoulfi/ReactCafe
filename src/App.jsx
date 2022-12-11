import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';
import NotFound from './components/pages/NotFound';
import './scss/app.scss';

function App() {
  const [categorySort, setCategorySort] = useState(0);
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://6395815690ac47c6806c6eaa.mockapi.io/Menu'
        );

        let dataFiltered = data.filter(
          (pizza) => pizza.category === categorySort || categorySort === 0
        );

        setMenu(dataFiltered);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [categorySort]);

  return (
    <BrowserRouter>
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
                    setCategorySort={setCategorySort}
                  />
                }
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
