import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import ordnaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import { Recipes } from '../pages';
import SearchProvider from '../contexts/SearchProvider';

const ALL_CATEGORY_FILTER = 'All-category-filter';

describe('Testa a página de receitas', () => {
  beforeEach(() => {
    const endpoints = {
      'https://www.themealdb.com/api/json/v1/1/search.php?s=': () => Promise.resolve({ json: () => meals }),
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list': () => Promise.resolve({ json: () => mealCategories }),
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': () => Promise.resolve({ json: () => drinks }),
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': () => Promise.resolve({ json: () => drinkCategories }),
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': () => Promise.resolve({ json: () => beefMeals }),
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink': () => Promise.resolve({ json: () => ordnaryDrinks }),
    };

    jest.spyOn(global, 'fetch').mockImplementation((url) => (endpoints[url] ? endpoints[url]() : Promise.resolve(new Error('URL not found'))));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Testa se a página de receitas é renderizada na rota /meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
      expect(history.location.pathname).toBe('/meals');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('Corba');
    });

    const beefBtn = screen.getByTestId('Beef-category-filter');
    userEvent.click(beefBtn);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('Beef and Mustard Pie');
    });

    const allBtn = screen.getByTestId(ALL_CATEGORY_FILTER);
    userEvent.click(allBtn);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(4);
      expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      const cardRecipe1 = screen.getByTestId(`${1}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe1).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('Corba');
      expect(cardRecipe1).toHaveTextContent('Kumpir');
    });
  });

  it('Testa se a página de receitas é renderizada na rota /drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(2);
      expect(history.location.pathname).toBe('/drinks');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('GG');
    });

    const ordinaryBtn = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryBtn);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(3);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('3-Mile Long Island Iced Tea');
    });

    const allBtn = screen.getByTestId(ALL_CATEGORY_FILTER);
    userEvent.click(allBtn);

    await waitFor(() => {
      expect(global.fetch).toBeCalledTimes(4);
      expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

      const cardRecipe0 = screen.getByTestId(`${0}-recipe-card`);
      const cardRecipe1 = screen.getByTestId(`${1}-recipe-card`);
      expect(cardRecipe0).toBeInTheDocument();
      expect(cardRecipe1).toBeInTheDocument();
      expect(cardRecipe0).toHaveTextContent('GG');
      expect(cardRecipe1).toHaveTextContent('A1');
    });
  });

  it('não chama setRecipes para pathname desconhecido', async () => {
    renderWithRouter(<SearchProvider><Recipes /></SearchProvider>, { initialEntries: ['/unknown'] });

    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();
    });

    const cardRecipe0 = screen.queryByTestId(`${0}-recipe-card`);
    expect(cardRecipe0).not.toBeInTheDocument();
  });

  it('Testa o botão all numa tela inexistente', async () => {
    const handleClick = jest.fn();
    renderWithRouter(<SearchProvider><Recipes /></SearchProvider>, { initialEntries: ['/unknown'] });

    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();
    });

    const allBtn = screen.queryByTestId(ALL_CATEGORY_FILTER);
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);

    await waitFor(() => {
      expect(global.fetch).not.toBeCalled();

      expect(handleClick).not.toBeCalled();

      const cardRecipe0 = screen.queryByTestId(`${0}-recipe-card`);
      expect(cardRecipe0).not.toBeInTheDocument();
    });
  });
});
