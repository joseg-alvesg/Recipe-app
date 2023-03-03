import React, { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';
import SearchBar from './SearchBar';

export default function Teste() {
  const {
    search,
    setSearch,
    test,
    setTest,
  } = useContext(SearchContext);

  const handleClick = ({ target }) => {
    const { value, name } = target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const testButton = () => {
    if (test === false) {
      setTest(true);
    } else {
      setTest(false);
    }
  };

  return (
    <div>
      <button
        data-testid="search-top-btn"
        onClick={ testButton }
      >
        s
      </button>
      { test
        ? (
          <>
            <input
              type="text"
              name="searchValue"
              data-testid="search-input"
              value={ search.searchValue }
              onChange={ handleClick }
            />
            <SearchBar />
          </>
        ) : null}

    </div>
  );
}
