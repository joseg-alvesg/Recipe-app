import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { MAX_INGREDIENTS } from '../../helpers/constants';
import { detailsApi } from '../../helpers/recipesApi';
import './RecipeInProgress.css';
import ProgressCard from '../../components/ProgressCard';

export default function RecipeInProgress() {
  const [ingredients, setIngredients] = useState([]);
  const {
    details,
    setRecipes,
    setDetails,
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

  const finishButton = () => {
    const { detail } = details;
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const completedRecipe = {
      id,
      type: recipeTypes().replace('s', ''),
      nationality: detail[0].strArea === undefined ? '' : detail[0].strArea,
      category: detail[0].strCategory,
      alcoholicOrNot: recipeTypes() === 'drinks' ? detail[0].strAlcoholic : '',
      name: detail[0][`str${tag()}`],
      image: detail[0][`str${tag()}Thumb`],
      doneDate: new Date(),
      tags: detail[0].strTags !== null ? detail[0].strTags.split(',') : [],
    };
    if (doneRecipes !== null
      && doneRecipes !== undefined) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([...doneRecipes, completedRecipe]));
      return history.push('../../done-recipes');
    } localStorage
      .setItem('doneRecipes', JSON.stringify([completedRecipe]));
    return history.push('../../done-recipes');
  };

  const attIngredients = () => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newIngredients = recipesInProgress[`${recipeTypes()}`][id];
    setIngredients(newIngredients);
  };

  const doneTasks = ({ target }) => {
    const task = document.getElementById(`${target.name}-task`);
    let recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress === undefined
      || recipesInProgress === null) {
      const recipesTest = {
        meals: {},
        drinks: {},
      };
      recipesTest[`${recipeTypes()}`][id] = [];
      recipesInProgress = recipesTest;
    }
    if (target.checked) {
      recipesInProgress[`${recipeTypes()}`][id].push(target.id);
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
      attIngredients();
      return task.classList.toggle('done');
    }
    const newProgressRecipes = recipesInProgress[`${recipeTypes()}`][id]
      .filter((item) => item !== target.id);
    recipesInProgress[`${recipeTypes()}`][id] = newProgressRecipes;
    console.log(recipesInProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    attIngredients();
    return task.classList.toggle('done');
  };

  useEffect(() => {
    const currentTask = () => {
      const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (type.includes('meals')) {
        const mealsIngredients = recipesInProgress.meals[id];
        setIngredients(mealsIngredients);
      } else {
        const drinksIngredients = recipesInProgress.drinks[id];
        setIngredients(drinksIngredients);
      }
    };
    const timer = setTimeout(() => {
      currentTask();
    }, '500');
    return () => clearTimeout(timer);
  }, [id, type]);

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
          <div>
            <ProgressCard
              ingredients={ ingredients }
              doneTasks={ doneTasks }
            />
            <button
              disabled={ ingredients?.length !== details?.ingredients.length }
              className="finish-button"
              data-testid="finish-recipe-btn"
              onClick={ finishButton }
            >
              Finish
            </button>
          </div>) : null}

    </div>
  );
}
