import { screen } from '@testing-library/react';
import App from '../App';
import {
  ROLE_HEADING_PROFILE,
  ROUTE_PROFILE,
  TEST_ID_BTN_PROFILE_DONE_RECIPES,
  TEST_ID_BTN_PROFILE_FAVORITE_RECIPES,
  TEST_ID_BTN_PROFILE_LOGOUT,
  TEST_ID_BTN_PROFILE_TOP,
  TEST_ID_PROFILE_EMAIL,
  VALID_EMAIL,
} from '../helpers/constants';
import { logInWithValidCredentials } from './helpers/mockFunctions';
import renderWithRouter from './renderWithRouter';

describe.todo('The Profile page', () => {
  it.todo('should render all elements correctly', () => {
    renderWithRouter(<App />);
    logInWithValidCredentials();

    const { history } = renderWithRouter(<App />);
    act(() => history.push(ROUTE_PROFILE));

    waitFor(() => {
      expect(screen.getByRole(...ROLE_HEADING_PROFILE)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_BTN_PROFILE_DONE_RECIPES)).toBeInTheDocument();
      expect(
        screen.getByTestId(TEST_ID_BTN_PROFILE_FAVORITE_RECIPES),
      ).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_BTN_PROFILE_LOGOUT)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_BTN_PROFILE_TOP)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_PROFILE_EMAIL)).toBeInTheDocument();
      expect(screen.getByTestId(TEST_ID_PROFILE_EMAIL)).toHaveTextContent(VALID_EMAIL);
    });
  });
  it.todo(
    'should navigate to the correct route when Done Recipes button is clicked',
    () => {},
  );
  it.todo(
    'should navigate to the correct route when Favorite Recipes button is clicked',
    () => {},
  );
  it.todo('should clear local storage when Logout button is clicked', () => {});
  it.todo('should navigate to the correct route when Logout button is clicked', () => {});
});
