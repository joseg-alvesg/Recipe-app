import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const MEALS_PATH = '/meals/52771';
const DRINKS_PATH = '/drinks/15997';
const START_BUTTON = 'start-recipe-btn';
const RECIPE_TITLE = 'recipe-title';
const FINISH_BTN = 'finish-recipe-btn';
const PROGRESS_MEALS_PATH = '/meals/52771/in-progress';

describe('Testa a página de detalhes de receitas de comidas', () => {
  it('Testa se a página de detalhes de receitas renderiza seu elementos', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
      expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
      expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
      expect(screen.getByTestId('instructions')).toBeInTheDocument();
      expect(screen.getByTestId('video')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId('1-recommendation-card')).toBeInTheDocument();
    });
  });

  it('Testa se os links de recomendação de drinks levam para o endereço certo', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId('0-recommendation-card'));
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
    });
  });

  it('Testa se os links de recomendação de meals levam para o endereço certo', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
      expect(screen.getByTestId('2-recommendation-card'));
    });
    userEvent.click(screen.getByTestId('2-recommendation-card'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/53065');
    });
  });

  it('Testa o start button do path meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
      expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument());

    userEvent.click(screen.getByTestId(START_BUTTON));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    });

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(3);

    for (let index = 0; index < inputs.length; index += 1) {
      userEvent.click(inputs[index]);
    }
    history.push(DRINKS_PATH);
    await waitFor(() => {
      expect(screen.getByTestId(START_BUTTON));
    });
    userEvent.click(screen.getByTestId(START_BUTTON));
    await waitFor(() => {
      expect(screen.getByTestId(FINISH_BTN));
    });
    userEvent.click(screen.getByTestId(FINISH_BTN));
  });

  it('Testa o start button do path drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    const progressTest = {
      drinks: {
        15997: ['Galliano', 'Ginger ale', 'Ice'],
      },
      meals: {
        52771: [],
      },
    };
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument());

    const test = screen.getByTestId(START_BUTTON);
    userEvent.click(screen.getByTestId(START_BUTTON));
    fireEvent(test, new MouseEvent('click', { bubbles: true }));

    await waitFor(() => {
      const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(progressRecipes).toStrictEqual(progressTest);
      expect(history.location.pathname).toBe(PROGRESS_MEALS_PATH);
    });
    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(8);

    for (let index = 0; index < inputs.length; index += 1) {
      userEvent.click(inputs[index]);
    }
    history.push(MEALS_PATH);
    await waitFor(() => {
      expect(screen.getByTestId(START_BUTTON));
    });
    userEvent.click(screen.getByTestId(START_BUTTON));
    await waitFor(() => {
      expect(history.location.pathname).toBe(PROGRESS_MEALS_PATH);
      expect(screen.getByTestId(FINISH_BTN));
    });
    userEvent.click(screen.getByTestId(FINISH_BTN));
    localStorage.clear();
  });

  it('Testa o localStorage vazio meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument());

    const test = screen.getByTestId(START_BUTTON);
    userEvent.click(screen.getByTestId(START_BUTTON));
    fireEvent(test, new MouseEvent('click', { bubbles: true }));
    await waitFor(() => {
      expect(history.location.pathname).toBe(PROGRESS_MEALS_PATH);
    });
    localStorage.clear();
  });

  it('Testa o localStorage vazio drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
      expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    });

    await waitFor(() => expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument());

    const test = screen.getByTestId(START_BUTTON);
    userEvent.click(screen.getByTestId(START_BUTTON));
    fireEvent(test, new MouseEvent('click', { bubbles: true }));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997/in-progress');
    });
  });
});
