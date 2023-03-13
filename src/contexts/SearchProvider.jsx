import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SearchContext from './SearchContext';

function SearchProvider({ children }) {
  const [recipes, setRecipes] = useState({
    recipeType: [],
    filtered: '',
  });
  const [favorited, setFavorited] = useState(false);
  const [details, setDetails] = useState({
    detail: [],
    ingredients: [],
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
    details,
    setDetails,
    favorited,
    setFavorited,
  }), [search, recipes, details, favorited]);

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
