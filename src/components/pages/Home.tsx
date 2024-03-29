import Card from '../Card';
import Categories from '../Categories';
import Sort from '../Sort';
import Skeleton from '../Card/Skeleton';
import Pagination from '../Pagination';
import { useSelector } from 'react-redux';

type MenuProps = {
  menu: string[];
};

const Home: React.FC<MenuProps> = ({ menu }) => {
  const { status } = useSelector((state: any) => state.pizza);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...new Array(10)].map((_, ind) => <Skeleton key={ind} />)
          : menu.map((pizza: any, ind) => <Card {...pizza} key={ind} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
