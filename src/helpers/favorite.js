import { getLocalStorage, setLocalStorage } from './localStorage';

export const setFavorite = (favorited, details, type, id) => {
  const favoriteRecipes = getLocalStorage('favoriteRecipes') || [];
  if (favorited) {
    const newFavorite = favoriteRecipes.filter((recipe) => id !== recipe.id);
    setLocalStorage('favoriteRecipes', newFavorite);
    return false;
  }

  const tag = () => {
    if (type.includes('meals')) return 'Meal';
    if (type.includes('drinks')) return 'Drink';
  };

  const favorite = {
    id: details.detail[0].idMeal || details.detail[0].idDrink,
    type: tag().toLowerCase(),
    nationality: details.detail[0].strArea || '',
    category: details.detail[0].strCategory,
    alcoholicOrNot: details.detail[0].strAlcoholic || '',
    name: details.detail[0].strMeal || details.detail[0].strDrink,
    image: details.detail[0].strMealThumb || details.detail[0].strDrinkThumb,
  };
  const newFavorite = [...favoriteRecipes, favorite];
  setLocalStorage('favoriteRecipes', newFavorite);
  return true;
};
