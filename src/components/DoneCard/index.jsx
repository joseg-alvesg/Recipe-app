import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import style from './DoneCard.module.css';

export default function DoneCard({ type }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div className={ style.favoritesRecipe }>
      {doneRecipes
        .filter((recipe) => {
          if (type === 'all') {
            return recipe;
          } return recipe.type === type;
        })
        .map((recipe, index) => (
          <div className={ style.favoritesRecipe2 } key={ index }>
            <Link
              className={ style.favoritesRecipe2 }
              to={ `../${recipe.type.concat('s')}/${recipe.id}` }
            >

              <img
                className={ style.imgs }
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h2>
            </Link>
            <div className={ style.favoritesRecipe3 }>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>

              <p
                className={ style.h1 }
                data-testid={ `${index}-horizontal-done-date` }
              >
                {recipe.doneDate}
              </p>
              <img
                className={ style.share }
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share icon"
              />
              {recipe.tags.map((tag, i) => (
                <p
                  className={ style.h1 }
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  { tag }
                </p>
              ))}
            </div>
          </div>))}
    </div>
  );
}
DoneCard.propTypes = {
  type: PropTypes.string,
}.isRequired;
