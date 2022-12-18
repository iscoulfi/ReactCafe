import { useContext, useState } from 'react';
import { CSContext } from '../App';

const Categories = () => {
  const { onClickCategory } = useContext(CSContext);

  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

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
