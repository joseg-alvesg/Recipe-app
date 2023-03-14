import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Button from '../../components/Button';
import Carousel from '../../components/Carousel';
import SearchContext from '../../contexts/SearchContext';
import { MAX_INGREDIENTS } from '../../helpers/constants';
import { recipeTypes, tag } from '../../helpers/Functions';
import { detailsApi } from '../../helpers/recipesApi';
import './RecipeDetails.css';
import { getLocalStorage } from '../../helpers/localStorage';
import { setFavorite } from '../../helpers/favorite';

import whiteHeart from '../../images/whiteHeartIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

const MAX_TIMEOUT_COPY = 3000;

export default function RecipeDetails() {
  const [copied, setCopied] = useState(false);

  const {
    details,
    setDetails,
    setRecipes,
    favorited,
    setFavorited,
  } = useContext(SearchContext);

  const { id } = useParams();
  const history = useHistory();
  const type = history.location.pathname;

  const startButton = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress !== undefined
      && recipesInProgress !== null) {
      if (recipesInProgress[`${recipeTypes(type)}`][id]) {
        return history.push(`/${recipeTypes(type)}/${id}/in-progress`);
      }
      recipesInProgress[`${recipeTypes(type)}`][id] = [];
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
      if (tag(type) === 'Meal') {
        return Object.keys(recipesList.meals).some((recipe) => id === recipe);
      }
      if (tag(type) === 'Drink') {
        return Object.keys(recipesList.drinks).some((recipe) => id === recipe);
      }
    } return false;
  };

  const doneRecipes = () => {
    const recipesList = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesList !== undefined
      && recipesList !== null) {
      return recipesList.some((recipe) => id === recipe.id);
    } return false;
  };

  useEffect(() => {
    async function getDetails() {
      const recipeDetails = await detailsApi(id, type);
      const ingredientList = [];
      await recipeDetails?.map((item) => {
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

      if (type?.includes('meals')) {
        const response = await fetch(mealsURL);
        const json = await response.json();
        return setRecipes({
          recipeType: json,
        });
      }
      const response = await fetch(drinksURL);
      const json = await response.json();
      return setRecipes({
        recipeType: json,
      });
    }
    getDetails();
    getRecipes();
  }, [id, type, setRecipes, setDetails]);

  useEffect(() => {
    const verifyFavorite = () => {
      const favoriteRecipes = getLocalStorage('favoriteRecipes') || [];
      return favoriteRecipes.some((recipe) => id === recipe.id);
    };

    setFavorited(verifyFavorite());
  }, [id, setFavorited]);

  function copyLink() {
    const link = `http://localhost:3000${type}`;
    clipboardCopy(link);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, MAX_TIMEOUT_COPY);
  }

  return (
    <div>
      {details.detail?.[0]
        ? (
          <>
            <section>
              <img
                className="img-details"
                src={ details.detail[0][`str${tag(type)}Thumb`] }
                alt={ details.detail[0][`str${tag(type)}`] }
                data-testid="recipe-photo"
              />
              <div className="recipes">
                <div className="names">
                  <h2 data-testid="recipe-title">
                    {details.detail[0][`str${tag(type)}`]}
                  </h2>
                  <p data-testid="recipe-category">
                    {tag(type) === 'Meal' ? details.detail[0].strCategory
                      : details.detail[0].strAlcoholic}
                  </p>
                </div>
                <button
                  type="button"
                  data-testid="share-btn"
                  src="src/images/shareIcon.svg"
                  onClick={ copyLink }
                >
                  <img src={ shareIcon } alt="" />
                </button>
                {copied && <span>Link copied!</span>}
                <button
                  type="button"
                  onClick={ () => {
                    setFavorited(setFavorite(
                      favorited,
                      details,
                      history.location.pathname,
                      id,
                    ));
                  } }
                >
                  <img
                    data-testid="favorite-btn"
                    src={ favorited ? blackHeart : whiteHeart }
                    alt=""
                  />
                </button>
              </div>
            </section>
            <ul className="ingredients">
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
            <h3 className="h3">Instructions</h3>
            <p className="instru" data-testid="instructions">
              {details.detail[0].strInstructions}
            </p>
            { tag(type) === 'Meal'
              ? (
                <iframe
                  className="video"
                  data-testid="video"
                  title={ details.detail[0][`str${tag(type)}`] }
                  src={ details.detail[0].strYoutube ? details.detail[0].strYoutube
                    .replace('watch?v=', 'embed/')
                    .replace('youtube', 'youtube-nocookie') : null }
                />
              ) : null}
            <Carousel tag={ tag(type) } />

            { !doneRecipes() ? (
              <Button
                buttons="start-button"
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
