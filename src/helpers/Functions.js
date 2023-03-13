import { MAX_INGREDIENTS } from './constants';
import { detailsApi } from './recipesApi';

export const tag = (type) => {
  if (type?.includes('meals')) {
    return 'Meal';
  }
  if (type?.includes('drinks')) {
    return 'Drink';
  }
};

export const recipeTypes = (type) => {
  if (type?.includes('meals')) {
    return 'meals';
  }
  if (type?.includes('drinks')) {
    return 'drinks';
  }
};

export async function getDetails(setDetails, id, type) {
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

export async function getRecipes(setRecipes) {
  const mealsURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const drinksURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  if (type.includes('meals')) {
    const response = await fetch(mealsURL);
    const json = await response.json();
    console.log(json);
    return setRecipes({
      recipeType: json,
    });
  }
  const response = await fetch(drinksURL);
  const json = await response.json();
  console.log(json);
  return setRecipes({
    recipeType: json,
  });
}
