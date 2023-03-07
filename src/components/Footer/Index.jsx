import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './footer.css';

function Footer() {
  const history = useHistory();

  const toDrinks = () => {
    history.push('/drinks');
  };
  const toMeals = () => {
    history.push('/meals');
  };

  return (
    <footer className="footer" data-testid="footer">
      <button onClick={ toDrinks }>
        <img
          alt="profile-icon"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button onClick={ toMeals }>
        <img
          alt="profile-icon"
          src={ mealIcon }
          data-testid="meals-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
