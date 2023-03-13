import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

export default function DoneCard({ type }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      {doneRecipes
        .filter((recipe) => {
          if (type === 'all') {
            return recipe;
          } return recipe.type === type;
        })
        .map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ `../${recipe.type.concat('s')}/${recipe.id}` }
            >
              <img
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

            <div>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.type === 'meal'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : recipe.alcoholicOrNot}
              </p>
            </div>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}
            </p>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share icon"
            />
            {recipe.tags.map((tag, i) => (
              <p
                key={ i }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </p>
            ))}

          </div>))}
    </div>
  );
}
DoneCard.propTypes = {
  type: PropTypes.string,
}.isRequired;
