import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import SearchContext from '../../contexts/SearchContext';
import { MAX_INGREDIENTS } from '../../helpers/constants';
import { detailsApi } from '../../helpers/recipesApi';
import './RecipeDetails.css';

export default function RecipeDetails() {
  // const [details, setDetails] = useState({
  //   detail: [],
  //   ingredients: [],
  // });
  const {
    details,
    setDetails,
    setRecipes,
  } = useContext(SearchContext);

  const { id } = useParams();
  const history = useHistory();
  const type = history.location.pathname;
  const tag = () => {
    if (type.includes('meals')) {
      return 'Meal';
    }
    if (type.includes('drinks')) {
      return 'Drink';
    }
  };
  const recipeTypes = () => {
    if (type.includes('meals')) {
      return 'meals';
    }
    if (type.includes('drinks')) {
      return 'drinks';
    }
  };

  const startButton = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress !== undefined
      && recipesInProgress !== null) {
      if (recipesInProgress[`${recipeTypes()}`][id]) {
        return history.push(`/${recipeTypes()}/${id}/in-progress`);
      }
      recipesInProgress[`${recipeTypes()}`][id] = [];
      return localStorage
        .setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
    const recipesTest = {
      meals: {},
      drinks: {},
    };
    if (type.includes('meals')) {
      recipesTest.meals[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesTest));
      return history.push(`/meals/${id}/in-progress`);
    }
    if (type.includes('drinks')) {
      recipesTest.drinks[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesTest));
      return history.push(`/drinks/${id}/in-progress`);
    }
  };

  const progressRecipes = () => {
    const recipesList = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesList !== undefined
      && recipesList !== null) {
      if (tag() === 'Meal') {
        return Object.keys(recipesList.meals).some((recipe) => id === recipe);
      }
      if (tag() === 'Drink') {
        return Object.keys(recipesList.drinks).some((recipe) => id === recipe);
      }
    }
    return false;
  };

  const doneRecipes = () => {
    const recipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesList !== undefined
      && recipesList !== null) {
      return recipesList.some((recipe) => id === recipe.id);
    }
    return false;
  };

  useEffect(() => {
    async function getDetails() {
      const recipeDetails = await detailsApi(id, type);
      const ingredientList = [];
      await recipeDetails.map((item) => {
        for (let index = 1; index < MAX_INGREDIENTS; index += 1) {
          if (item[`strIngredient${index}`] !== ''
           && item[`strIngredient${index}`] !== null
           && item[`strIngredient${index}`] !== undefined) {
            ingredientList.push({
              ingredient: item[`strIngredient${index}`],
              measure: item[`strMeasure${index}`],
            });
          }
        } return setDetails({
          detail: recipeDetails,
          ingredients: ingredientList,
        });
      });
    }
    async function getRecipes() {
      const mealsURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const drinksURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

      if (type.includes('meals')) {
        const response = await fetch(mealsURL);
        const json = await response.json();
        console.log(json);
        setRecipes({
          recipeType: json,
        });
        return response.ok ? Promise.resolve(json) : Promise.reject(json);
      }
      const response = await fetch(drinksURL);
      const json = await response.json();
      console.log(json);
      setRecipes({
        recipeType: json,
      });
      return response.ok ? Promise.resolve(json) : Promise.reject(json);
    }
    getDetails();
    getRecipes();
  }, [id, type, setRecipes, setDetails]);

  return (
    <div>
      {details.detail?.[0]
        ? (
          <>
            <img
              src={ details.detail[0][`str${tag()}Thumb`] }
              alt={ details.detail[0][`str${tag()}`] }
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">
              {details.detail[0][`str${tag()}`]}
            </h2>
            <p data-testid="recipe-category">
              {tag() === 'Meal' ? details.detail[0].strCategory
                : details.detail[0].strAlcoholic}
            </p>
            <ul>
              <h3>Ingredients</h3>
              {details.ingredients.map((item, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {`${item.ingredient} - ${item.measure}`}
                </li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <p data-testid="instructions">
              {details.detail[0].strInstructions}
            </p>
            { tag() === 'Meal'
              ? (
                <iframe
                  data-testid="video"
                  title={ details.detail[0][`str${tag()}`] }
                  src={ details.detail[0].strYoutube }
                />
              ) : null}
            <Carousel tag={ tag() } />

            { !doneRecipes() ? (
              <Button
                className="start-button"
                dataTestId="start-recipe-btn"
                onClick={ startButton }
              >
                {progressRecipes() ? 'Continue Recipe' : 'Start Recipe' }
              </Button>)
              : null}
          </>) : null}

    </div>
  );
}
