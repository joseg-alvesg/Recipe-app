import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { MAX_INGREDIENTS, MAX_RECOMMENDED_RECIPES } from '../../helpers/constants';
import { detailsApi } from '../../helpers/recipesApi';
import './RecipeDetails.css';

export default function RecipeDetails() {
  const [details, setDetails] = useState({
    detail: [],
    ingredients: [],
  });
  const {
    recipes,
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

  useEffect(() => {
    async function getDetails() {
      const recipeDetails = await detailsApi(id, type);
      const test = [];
      await recipeDetails.map((item) => {
        for (let index = 1; index < MAX_INGREDIENTS; index += 1) {
          if (item[`strIngredient${index}`] !== ''
           && item[`strIngredient${index}`] !== null) {
            test.push({
              ingredient: item[`strIngredient${index}`],
              measure: item[`strMeasure${index}`],
            });
          }
        } return setDetails({
          detail: recipeDetails,
          ingredients: test,
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
  }, [id, type, setRecipes]);

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
            <div className="recommended-box">
              {tag() === 'Meal' ? recipes.recipeType.drinks?.map((item, index) => {
                if (index < MAX_RECOMMENDED_RECIPES) {
                  return (
                    <div
                      className="recommended-card"
                      data-testid={ `${index}-recommendation-card` }
                      key={ index }
                    >
                      <img
                        className="carousel-img"
                        src={ item.strDrinkThumb }
                        alt={ item.strDrink }
                        data-testid="recipe-photo"
                      />
                      <p data-testid={ `${index}-recommendation-title` }>
                        { item.strDrink }
                      </p>
                    </div>

                  );
                } return null;
              }) : recipes.recipeType.meals?.map((item, index) => {
                if (index < MAX_RECOMMENDED_RECIPES) {
                  return (
                    <div
                      className="recommended-card"
                      data-testid={ `${index}-recommendation-card` }
                      key={ index }
                    >
                      <img
                        className="carousel-img"
                        src={ item.strMealThumb }
                        alt={ item.strMeal }
                        data-testid="recipe-photo"
                      />
                      <p data-testid={ `${index}-recommendation-title` }>
                        { item.strMeal }
                      </p>
                    </div>

                  );
                } return null;
              })}
            </div>

          </>) : null}

    </div>
  );
}
