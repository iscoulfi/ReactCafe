import { useState } from 'react';
import Card from '../Card';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../Card/Skeleton';

const Home = ({ menu, isLoading, setCategorySort }) => {
  const [sortValue, setSortValue] = useState('популярности');
  return (
    <div className="container">
      <div className="content__top">
        <Categories setCategorySort={setCategorySort} />
        <Sort sortValue={sortValue} setSortValue={setSortValue} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((_, ind) => <Skeleton key={ind} />)
          : menu.map((pizza, ind) => <Card {...pizza} key={ind} />)}
      </div>
    </div>
  );
};

export default Home;
