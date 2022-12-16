import { BiSearchAlt2, BiX } from 'react-icons/bi';
import { CSContext } from '../App';
import { useContext } from 'react';
import styles from './Search.module.scss';

const Search = () => {
  const { value, setValue } = useContext(CSContext);
  return (
    <div className={styles.root}>
      <BiSearchAlt2 className={styles.icon} />
      <input
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {value && <BiX className={styles.ico} onClick={() => setValue('')} />}
    </div>
  );
};

export default Search;
