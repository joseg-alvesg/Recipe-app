import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../contexts/SearchContext';
import { recipeApi } from '../helpers/recipesApi';

export default function SearchBar() {
  const {
    search,
    setSearch,
    recipes,
    buttonSearch,
    setbuttonSearch,
    setRecipes,
  } = useContext(SearchContext);

  const history = useHistory();

  const test = history.location.pathname
    .replace('/', '')
    .replace('s', '')
    .replace('m', 'M')
    .replace('d', 'D');

  const handleClick = ({ target }) => {
    const { value, name } = target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const testButton = () => {
    if (buttonSearch === false) {
      setbuttonSearch(true);
    } else {
      setbuttonSearch(false);
    }
  };

  const recipeList = async () => {
    const { radioValue, searchValue } = search;
    const type = history.location.pathname.replace('/', '');

    if (radioValue === 'f' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const list = await recipeApi(radioValue, searchValue, type);
      console.log(list);
      if (list[type] === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (list[type].length === 1) {
        console.log(list[type][0]);
        history.push({
          pathname: `/${type}/${list[type][0][`id${test}`]}`,
        });
      } else {
        setRecipes({
          ...recipes,
          recipeType: list[type],
        });
      }
    }
  };

  const { recipeType } = recipes;
  return (
    <div>
      <button
        data-testid="search-top-btn"
        onClick={ testButton }
      >
        Search
      </button>
      { buttonSearch
        ? (
          <>
            <div>

              <input
                type="text"
                name="searchValue"
                data-testid="search-input"
                value={ search.searchValue }
                onChange={ handleClick }
              />

            </div>
            <label htmlFor="ingredient-radio">
              <input
                name="radioValue"
                type="radio"
                id="ingredient-radio"
                data-testid="ingredient-search-radio"
                value="i"
                onClick={ handleClick }
              />
              Ingredient
            </label>
            <label htmlFor="name-radio">
              <input
                name="radioValue"
                type="radio"
                id="name-radio"
                data-testid="name-search-radio"
                value="s"
                onClick={ handleClick }
              />
              Name
            </label>
            <label htmlFor="first-letter-radio">
              <input
                name="radioValue"
                type="radio"
                id="first-letter-radio"
                data-testid="first-letter-search-radio"
                value="f"
                onClick={ handleClick }
              />
              First letter
            </label>
            <button
              type="button"
              data-testid="exec-search-btn"
              onClick={ () => recipeList() }
            >
              buscar
            </button>

          </>
        ) : null}
      <div>
        {recipeType !== 0 ? recipeType.map((recipe, index) => {
          if (index < '12') {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }

              >
                <img
                  src={ recipe[`str${test}Thumb`] }
                  alt={ recipe[`str${test}`] }
                  data-testid={ `${index}-card-img` }
                />
                {console.log(recipe)}
                <p data-testid={ `${index}-card-name` }>{ recipe[`str${test}`] }</p>

              </div>
            );
          } return null;
        }) : null}
      </div>
    </div>
  );
}
