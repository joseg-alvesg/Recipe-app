import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCards({ recipe, index, linkToDetails }) {
  return (
    <Link to={ linkToDetails }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe.strDrinkThumb || recipe.strMealThumb }
          data-testid={ `${index}-card-img` }
          alt={ recipe.strDrink || recipe.strMeal }
        />
        <h3
          data-testid={ `${index}-card-name` }
        >
          {recipe.strDrink || recipe.strMeal}
        </h3>
      </div>
    </Link>
  );
}

RecipeCards.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    linkToDetails: PropTypes.string,
  }).isRequired,
}.isRequired;
