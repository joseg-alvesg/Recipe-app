import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
// import SearchProvider from '../contexts/SearchProvider';

const TEST_EMAIL = 'test@test.com';
const TEST_PASSWORD = '1234567';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';

describe('Testa a página de receitas', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se a página é renderizada corretamente com 5 botões a mais', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => meals,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => mealCategories,
    }));

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(LOGIN_BUTTON);

    await act(async () => {
      userEvent.type(emailInput, TEST_EMAIL);
      userEvent.type(passwordInput, TEST_PASSWORD);
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
      expect(global.fetch).toBeCalledTimes(2);
    });
    const beefButton = screen.getByTestId('Beef-category-filter');
    const chickenButton = screen.getByTestId('Chicken-category-filter');
    const dessertButton = screen.getByTestId('Dessert-category-filter');
    const goatButton = screen.getByTestId('Goat-category-filter');

    expect(beefButton).toBeInTheDocument();
    expect(chickenButton).toBeInTheDocument();
    expect(dessertButton).toBeInTheDocument();
    expect(goatButton).toBeInTheDocument();
  });

  it('Testa se as 12 comidas são renderizadas', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => meals,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => mealCategories,
    }));

    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const submitButton = screen.getByTestId(LOGIN_BUTTON);

    await act(async () => {
      userEvent.type(emailInput, TEST_EMAIL);
      userEvent.type(passwordInput, TEST_PASSWORD);
      userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
      expect(global.fetch).toBeCalledTimes(2);
    });

    meals.meals.splice(0, 12).forEach((_meal, index) => {
      const mealCard = screen.getByTestId(`${index}-recipe-card`);
      expect(mealCard).toBeInTheDocument();
    });
  });

  it('Testa se os botôes de categoria são renderizados', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => drinks,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => drinkCategories,
    }));

    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
    });

    drinkCategories.drinks.splice(0, 12).forEach((drink) => {
      const drinkButton = screen.getByTestId(`${drink.strCategory}-category-filter`);
      expect(drinkButton).toBeInTheDocument();
    });
  });

  it('Testa se os 12 drinks são renderizados', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => drinks,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => drinkCategories,
    }));

    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/drinks');
    });

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
    });

    drinks.drinks.splice(0, 12).forEach((_drink, index) => {
      const drinkCard = screen.getByTestId(`${index}-recipe-card`);
      expect(drinkCard).toBeInTheDocument();
    });
  });

  it.only('Testa se o botão de categoria de comida funciona', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => meals,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => mealCategories,
    })).mockImplementationOnce(() => Promise.resolve({
      json: () => beefMeals,
    }));

    const { history } = renderWithRouter(<App />);

    await act(async () => {
      history.push('/meals');
    });

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
    });

    const recipeCard0 = screen.getByTestId('0-recipe-card');
    const recipeCard1 = screen.getByTestId('1-recipe-card');
    expect(recipeCard0).toBeInTheDocument();
    expect(recipeCard1).toBeInTheDocument();

    expect(recipeCard0).toHaveTextContent('Corba');
    expect(recipeCard1).toHaveTextContent('Kumpir');

    const beefButton = screen.getByTestId('Beef-category-filter');

    await act(async () => {
      userEvent.click(beefButton);
    }, 2000);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(3);
    });

    const recipeCard2 = screen.getByTestId('0-recipe-card');
    const recipeCard3 = screen.getByTestId('1-recipe-card');

    expect(recipeCard2).toBeInTheDocument();
    expect(recipeCard3).toBeInTheDocument();

    expect(recipeCard2).toHaveTextContent('Beef and Mustard Pie');
    expect(recipeCard3).toHaveTextContent('Beef and Oyster pie');
  });
});
