import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext';
import { MAX_RECOMMENDED_RECIPES } from '../../helpers/constants';

export default function Carousel({ tag }) {
  const {
    recipes,
  } = useContext(SearchContext);
  return (
    <div className="recommended-box">
      {tag === 'Meal' ? recipes.recipeType.drinks?.map((item, index) => {
        if (index < MAX_RECOMMENDED_RECIPES) {
          return (
            <Link
              key={ index }
              to={ `../drinks/${item.idDrink}` }
            >
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
            </Link>

          );
        } return null;
      }) : recipes.recipeType.meals?.map((item, index) => {
        if (index < MAX_RECOMMENDED_RECIPES) {
          return (
            <Link
              key={ index }
              to={ `../meals/${item.idMeal}` }
            >
              <div
                className="recommended-card"
                data-testid={ `${index}-recommendation-card` }
              >
                <img
                  className="carousel-img"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  data-testid="recipe-photo"
                />
                <p className="linkH3" data-testid={ `${index}-recommendation-title` }>
                  { item.strMeal }
                </p>
              </div>
            </Link>

          );
        } return null;
      })}
    </div>

  );
}

Carousel.propTypes = {
  tag: PropTypes.func,
}.isRequired;
