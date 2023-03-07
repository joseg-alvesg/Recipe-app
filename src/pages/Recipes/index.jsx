import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import {
  fetchMeals,
  fetchDrinks,
  fetchDrinkCategories,
  fetchMealCategories,
  fetchMealByCategory,
  fetchDrinkByCategory,
} from '../../helpers/services';
import RecipeCards from '../../components/RecipeCard/RecipeCards';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

const MAX_RECIPES = 12;
const MAX_CATEGORIES = 5;

export default function Recipes() {
  const { pathname } = useLocation();
  const { recipes, setRecipes } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    switch (pathname) {
    case '/meals':
      fetchMeals(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => setRecipes({ recipeType: data.meals }));
      fetchMealCategories(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => setCategories(data.meals));
      break;
    case '/drinks':
      fetchDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then(
        (data) => setRecipes({ recipeType: data.drinks }),
      );
      fetchDrinkCategories(
        'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => setCategories(data.drinks));
      break;
    default:
      break;
    }
  }, [pathname, setRecipes]);

  const handleClick = async ({ target: { name } }) => {
    if (name === 'All' || name === recipes.filtered) {
      switch (pathname) {
      case '/meals':
        await fetchMeals('https://www.themealdb.com/api/json/v1/1/search.php?s=').then(
          (data) => setRecipes({ recipeType: data.meals }),
        );
        break;
      case '/drinks':
        await fetchDrinks(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
        ).then((data) => setRecipes({ recipeType: data.drinks }));
        break;
      default:
      }
    } else {
      switch (pathname) {
      case '/meals':
        await fetchMealByCategory(
          'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
          name,
        ).then((data) => {
          setRecipes({ recipeType: data.meals, filtered: name });
        });
        break;
      case '/drinks':
        await fetchDrinkByCategory(
          'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
          name,
        ).then((data) => {
          setRecipes({ recipeType: data.drinks, filtered: name });
        });
        break;
      default:
        break;
      }
    }
  };

  const displayRecipes = recipes.recipeType.filter((_recipe, i) => i < MAX_RECIPES);

  return (
    <div>
      <Header title={ pathname.replace('/', '') } />
      <button
        type="button"
        onClick={ handleClick }
        data-testid="All-category-filter"
        name="All"
      >
        All
      </button>
      {categories?.slice(0, MAX_CATEGORIES)?.map((category, index) => (
        <Button
          dataTestId={ `${category.strCategory}-category-filter` }
          key={ index + 1 }
          name={ category.strCategory }
          onClick={ handleClick }
          category={ category }
        >
          {category.strCategory}
        </Button>
      ))}

      {displayRecipes.map((recipe, index) => (
        <RecipeCards
          key={ recipe.strDrink || recipe.strMeal }
          recipe={ recipe }
          index={ index }
          linkToDetails={ `${pathname}/${recipe.idMeal || recipe.idDrink}` }
        />
      ))}
      <Footer />
    </div>
  );
}
