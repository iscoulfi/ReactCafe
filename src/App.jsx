import Header from './components/Header';
import Card from './components/Card';
import Categories from './components/Categories';
import Sort from './components/Sort';
import menu from './assets/menu';
import './scss/app.scss';
import { useState } from 'react';

function App() {
  const [categorySort, setCategorySort] = useState(0);
  const [sortValue, setSortValue] = useState('популярности');

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories setCategorySort={setCategorySort} />
              <Sort sortValue={sortValue} setSortValue={setSortValue} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {menu
                .filter(
                  (pizza) =>
                    pizza.category === categorySort || categorySort === 0
                )
                .map((pizza, ind) => (
                  <Card {...pizza} key={ind} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
