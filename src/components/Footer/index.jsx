import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import style from './Footer.module.css';

function Footer() {
  const history = useHistory();

  const toDrinks = () => {
    history.push('/drinks');
  };
  const toMeals = () => {
    history.push('/meals');
  };

  return (
    <footer className={ style.footer } data-testid="footer">
      <button className={ style.buttonsFooter } onClick={ toDrinks }>
        <img
          alt="profile-icon"
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button className={ style.buttonsFooter } onClick={ toMeals }>
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
