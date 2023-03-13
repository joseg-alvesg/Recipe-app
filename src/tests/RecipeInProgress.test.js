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

describe('Testa a página de progresso de receitas', () => {
  it('Testa se ao clicar no ingrediente de bebidas ele é checked', async () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: [DRINKS_PATH],
      },
    );
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
    });
    history.push('/drinks/15997/in-progress');

    await waitFor(() => expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument());

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(3);

    userEvent.click(inputs[0]);
    expect(inputs[0]).toBeChecked();

    userEvent.click(inputs[0]);
    expect(inputs[0]).not.toBeChecked();

    localStorage.clear();
  });

  it('Testa se ao clicar no ingrediente de comidas ele é checked', async () => {
    const { history } = renderWithRouter(
      <App />,
      { initialEntries: [MEALS_PATH],
      },
    );
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
    });
    history.push(PROGRESS_MEALS_PATH);

    await waitFor(() => expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument());

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(8);

    userEvent.click(inputs[0]);
    expect(inputs[0]).toBeChecked();

    userEvent.click(inputs[0]);
    expect(inputs[0]).not.toBeChecked();

    localStorage.clear();
  });

  it('Testa se a página de progesso de receitas de comidas renderiza seu elementos', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(START_BUTTON));

    await waitFor(() => {
      expect(history.location.pathname).toBe(PROGRESS_MEALS_PATH);
    });

    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId(RECIPE_TITLE)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-ingredient-step')).toBeInTheDocument();

    localStorage.clear();
  });

  it('Testa o botão de finalizar receitas com comidas', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [MEALS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(MEALS_PATH);
      expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument();
    });
    userEvent.click(screen.getByTestId(START_BUTTON));

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(8);

    for (let index = 0; index < inputs.length; index += 1) {
      userEvent.click(inputs[index]);
    }
    userEvent.click(screen.getByTestId(FINISH_BTN));

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });

  it('Testa o botão de finalizar receitas com drinks', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [DRINKS_PATH] });
    await waitFor(() => {
      expect(history.location.pathname).toBe(DRINKS_PATH);
      expect(screen.getByTestId(START_BUTTON)).toBeInTheDocument();
    });

    const test = screen.getByTestId(START_BUTTON);
    userEvent.click(screen.getByTestId(START_BUTTON));
    fireEvent(test, new MouseEvent('click', { bubbles: true }));

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997/in-progress'));

    const inputs = screen.getAllByRole('checkbox');
    expect(inputs.length).toBe(3);

    for (let index = 0; index < inputs.length; index += 1) {
      userEvent.click(inputs[index]);
    }
    userEvent.click(screen.getByTestId(FINISH_BTN));

    await waitFor(() => expect(history.location.pathname).toBe('/done-recipes'));
  });
});
