import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  ROUTE_DONE_RECIPES,
  ROUTE_FAVORITE_RECIPES,
  ROUTE_LOGIN,
  TEST_ID_BTN_PROFILE_DONE_RECIPES,
  TEST_ID_BTN_PROFILE_FAVORITE_RECIPES,
  TEST_ID_BTN_PROFILE_LOGOUT,
  TEST_ID_PROFILE_EMAIL,
  USER,
} from '../../helpers/constants';
import { getLocalStorage } from '../../helpers/localStorage';
import style from './Profile.module.css';

export default function Profile() {
  const history = useHistory();

  const goTo = (route) => history.push(route);

  const { email } = getLocalStorage(USER);

  const logout = () => {
    localStorage.clear();
    goTo(ROUTE_LOGIN);
  };

  return (
    <>
      <Header title="Profile" renderSearchBtn={ false } />
      <section className={ style.profile }>
        <p className={ style.email } data-testid={ TEST_ID_PROFILE_EMAIL }>{email}</p>
        <Button
          buttons={ style.doneRecipes }
          dataTestId={ TEST_ID_BTN_PROFILE_DONE_RECIPES }
          onClick={ () => goTo(ROUTE_DONE_RECIPES) }
        >
          Done Recipes
        </Button>
        <Button
          buttons={ style.favoriteRecipes }
          dataTestId={ TEST_ID_BTN_PROFILE_FAVORITE_RECIPES }
          onClick={ () => goTo(ROUTE_FAVORITE_RECIPES) }
        >
          Favorite Recipes
        </Button>
        <Button
          buttons={ style.logoutButton }
          dataTestId={ TEST_ID_BTN_PROFILE_LOGOUT }
          onClick={ () => logout() }
        >
          Logout
        </Button>
      </section>
      <Footer />
    </>
  );
}
