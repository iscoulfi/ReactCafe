import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Categories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  const dispatch = useDispatch();

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((pizza, ind) => (
          <li
            className={activeCategory === ind ? 'active' : ''}
            onClick={() => {
              setActiveCategory(ind);
              onClickCategory(ind);
            }}
            key={pizza}
          >
            {pizza}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
