import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ROLE_HEADING_PROFILE,
  ROUTE_DONE_RECIPES,
  ROUTE_FAVORITE_RECIPES,
  ROUTE_LOGIN,
  TEST_ID_BTN_BOT_DRINKS,
  TEST_ID_BTN_BOT_MEALS,
  TEST_ID_BTN_PROFILE_DONE_RECIPES,
  TEST_ID_BTN_PROFILE_FAVORITE_RECIPES,
  TEST_ID_BTN_PROFILE_LOGOUT,
  TEST_ID_BTN_TOP_PROFILE,
  TEST_ID_PROFILE_EMAIL,
  USER,
  VALID_EMAIL,
} from '../helpers/constants';
import renderWithRouter from './renderWithRouter';
import { Profile } from '../pages';

describe('The Profile page', () => {
  it('should render all elements correctly', () => {
    window.localStorage.setItem(USER, JSON.stringify({ email: VALID_EMAIL }));
    renderWithRouter(<Profile />);

    expect(screen.getByTestId(TEST_ID_BTN_TOP_PROFILE)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_HEADING_PROFILE)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_PROFILE_EMAIL)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_PROFILE_DONE_RECIPES)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_PROFILE_FAVORITE_RECIPES)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_PROFILE_LOGOUT)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_BOT_DRINKS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_BOT_MEALS)).toBeInTheDocument();
  });

  it('should navigate to the correct route when Done Recipes button is clicked', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<Profile />);

    userEvent.click(screen.getByTestId(TEST_ID_BTN_PROFILE_DONE_RECIPES));

    waitFor(() => expect(pathname).toBe(ROUTE_DONE_RECIPES));
  });

  it('should navigate to the correct route when Favorite Recipes button is clicked', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<Profile />);

    userEvent.click(screen.getByTestId(TEST_ID_BTN_PROFILE_FAVORITE_RECIPES));

    waitFor(() => expect(pathname).toBe(ROUTE_FAVORITE_RECIPES));
  });

  it('should navigate to the correct route when Logout button is clicked', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<Profile />);

    userEvent.click(screen.getByTestId(TEST_ID_BTN_PROFILE_LOGOUT));

    waitFor(() => expect(pathname).toBe(ROUTE_LOGIN));
  });

  it('should clear local storage when Logout button is clicked', () => {
    window.localStorage.setItem(USER, JSON.stringify({ email: VALID_EMAIL }));
    renderWithRouter(<Profile />);

    expect(screen.getByTestId(TEST_ID_PROFILE_EMAIL)).toHaveTextContent(VALID_EMAIL);

    userEvent.click(screen.getByTestId(TEST_ID_BTN_PROFILE_LOGOUT));

    expect(localStorage.getItem(USER)).toBeNull();
  });
});
