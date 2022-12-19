import { BiSearchAlt2, BiX } from 'react-icons/bi';
import { setValue } from '../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import styles from './Search.module.scss';
import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef();
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <BiSearchAlt2 className={styles.icon} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
        value={searchValue}
        onChange={onChangeInput}
      />
      {searchValue && (
        <BiX
          className={styles.ico}
          onClick={() => {
            dispatch(setValue(''));
            setSearchValue('');
            inputRef.current.focus();
          }}
        />
      )}
    </div>
  );
};

export default Search;
