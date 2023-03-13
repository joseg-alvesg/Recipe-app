import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import style from './RecipeCard.module.css';

export default function RecipeCards({ recipe, index, linkToDetails }) {
  return (
    <section className={ style.borderTotal }>
      <Link to={ linkToDetails } className={ style.link }>
        <div className={ style.recipes } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ recipe.strDrink || recipe.strMeal }

          />
          <h3
            className={ style.h3Recipes }
            data-testid={ `${index}-card-name` }
          >
            {recipe.strDrink || recipe.strMeal}
          </h3>
        </div>
      </Link>
    </section>
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
