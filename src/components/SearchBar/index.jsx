import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { recipeApi } from '../../helpers/recipesApi';
import style from './SearchBar.module.css';

export default function SearchBar() {
  const {
    search,
    setSearch,
    recipes,
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

  const recipeList = async () => {
    const { radioValue, searchValue } = search;
    const type = history.location.pathname.replace('/', '');

    if (radioValue === 'f' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const list = await recipeApi(radioValue, searchValue, type);
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

  return (
    <div className={ style.pesquisar }>
      <input
        className={ style.search }
        type="text"
        name="searchValue"
        data-testid="search-input"
        value={ search.searchValue }
        onChange={ handleClick }
      />
      <label htmlFor="ingredient-radio">
        <input
          className={ style.ratioButon }
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
          className={ style.ratioButon }
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
          className={ style.ratioButon }
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
        className={ style.buscarButton }
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => recipeList() }
      >
        buscar
      </button>

      {/* <div>
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
                <p data-testid={ `${index}-card-name` }>{ recipe[`str${test}`] }</p>

              </div>
            );
          } return null;
        }) : null}
      </div> */}
    </div>
  );
}
