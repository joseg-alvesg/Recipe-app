import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [test, setTest] = useState(false);
  const [recipes, setRecipes] = useState({
    meals: [],
    drinks: [],
  });
  const [search, setSearch] = useState({
    radioValue: '',
    searchValue: '',
  });

  useEffect(() => {

  });

  const contextValue = useMemo(() => ({
    search,
    setSearch,
    recipes,
    setRecipes,
    test,
    setTest,
  }), [search, recipes, test]);

  return (
    <SearchContext.Provider value={ contextValue }>
      {children}
    </SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default SearchProvider;
