import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import SearchContext from '../../contexts/SearchContext';
import style from './ProgressCard.module.css';

export default function ProgressCard({ ingredients, doneTasks }) {
  const {
    details,

  } = useContext(SearchContext);

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

  return (
    <div>
      <img
        className={ style.img }
        src={ details.detail[0][`str${tag()}Thumb`] }
        alt={ details.detail[0][`str${tag()}`] }
        data-testid="recipe-photo"
      />
      <h2 className={ style.h2 } data-testid="recipe-title">
        {details.detail[0][`str${tag()}`]}
      </h2>
      <p className={ style.h2 } data-testid="recipe-category">
        {tag() === 'Meal' ? details.detail[0].strCategory
          : details.detail[0].strAlcoholic}
      </p>
      <div className={ style.icons }>
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
        />
        <img
          src={ whiteHeartIcon }
          alt="heart icon"
          data-testid="favorite-btn"
        />
      </div>
      <div className={ style.checklist }>
        <h3>Ingredients</h3>
        {details.ingredients.map((item, index) => (
          <label
            id={ `${index}-task` }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={ ingredients?.includes(item.ingredient)
              ? 'done' : 'ingredient-item' }
            htmlFor={ item.ingredient }
          >
            <input
              checked={ ingredients?.includes(item.ingredient) }
              className="ingredients-inputs"
              onChange={ doneTasks }
              id={ item.ingredient }
              name={ index }
              type="checkbox"
            />

            {`${item.ingredient} - ${item.measure}`}

          </label>

        ))}

      </div>
      <div className={ style.instrucoes }>
        <h3>Instructions</h3>
        <p data-testid="instructions">
          {details.detail[0].strInstructions}
        </p>
      </div>
    </div>
  );
}
ProgressCard.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  doneTasks: PropTypes.func,
}.isRequired;
