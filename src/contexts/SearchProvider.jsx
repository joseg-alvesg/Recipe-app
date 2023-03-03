import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [buttonSearch, setbuttonSearch] = useState(false);
  const [recipes, setRecipes] = useState({
    recipeType: [],
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
    buttonSearch,
    setbuttonSearch,
  }), [search, recipes, buttonSearch]);

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
