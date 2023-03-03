import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchContext from '../contexts/SearchContext';
import { mealsApi, drinksApi } from '../helpers/recipesApi';

export default function SearchBar() {
  const {
    search,
    setSearch,
    recipes,
    setRecipes,
  } = useContext(SearchContext);

  const history = useHistory();

  const handleClick = ({ target }) => {
    const { value, name } = target;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  const mealList = async () => {
    const { radioValue, searchValue } = search;
    if (radioValue === 'f' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const mealsList = await mealsApi(radioValue, searchValue);
      if (mealsList.meals === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (mealsList.meals.length === 1) {
        history.push({
          pathname: `/meals/${mealsList.meals[0].idMeal}`,
        });
      } else {
        setRecipes({
          ...recipes,
          meals: mealsList.meals,
          drinks: [],
        });
      }
    }
  };

  const drinkList = async () => {
    const { radioValue, searchValue } = search;
    if (radioValue === 'f' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const drinksList = await drinksApi(radioValue, searchValue);
      if (drinksList.drinks === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (drinksList.drinks.length === 1) {
        history.push({
          pathname: `/drinks/${drinksList.drinks[0].idDrink}`,
        });
      } else {
        setRecipes({
          ...recipes,
          drinks: drinksList.drinks,
          meals: [],
        });
      }
    }
  };

  const recipeList = (param) => {
    if (param === '/meals') {
      mealList();
    }
    if (param === '/drinks') {
      drinkList();
    }
  };

  const { meals, drinks } = recipes;
  return (
    <div>
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
        onClick={ () => recipeList(history.location.pathname) }
      >
        buscar
      </button>
      <div>
        {meals !== 0 ? meals.map((meal, index) => {
          if (index < '12') {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }

              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>

              </div>
            );
          } return null;
        }) : null}
        {drinks !== 0 ? drinks.map((drink, index) => {
          if (index < '12') {
            return (
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>

              </div>
            );
          } return null;
        }) : null}
      </div>
    </div>
  );
}
