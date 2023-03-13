import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DONE_RECIPES,
  ROLE_BTN_ALL,
  ROLE_BTN_DRINKS,
  ROLE_BTN_MEALS,
  ROLE_HEADING_DONE_RECIPES,
  TEST_ID_HORIZONTAL_SHARE_BTN,
  TEST_ID_BTN_TOP_PROFILE,
  TEST_ID_HORIZONTAL_NAME,
  TEST_ID_HORIZONTAL_TAG,
  TEST_ID_HORIZONTAL_DONE_DATE,
  TEST_ID_HORIZONTAL_IMG,
  TEST_ID_HORIZONTAL_TOP_TEXT,
} from '../helpers/constants';
import { DoneRecipes } from '../pages';
import { doneRecipes } from './helpers/mockData';
import renderWithRouter from './renderWithRouter';

const ZERO = 0;
const ONE = 1;
const TAG_MOCKED_CURRY = 'Curry';
const TAG_MOCKED_PASTA = 'Pasta';
const URL_DETAILS_MEAL = 'http://localhost:3000/meals/52771';
const ROUTE_MOCKED_MEAL = '/meals/52771';
const ROUTE_MOCKED_DRINK = '/drinks/178319';

describe('The Done Recipes page', () => {
  beforeEach(() => {
    localStorage.setItem(DONE_RECIPES, JSON.stringify(doneRecipes));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render all static elements correctly', () => {
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId(TEST_ID_BTN_TOP_PROFILE)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_HEADING_DONE_RECIPES)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_BTN_ALL)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_BTN_DRINKS)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_BTN_MEALS)).toBeInTheDocument();
  });

  it('should display correct attributes for any given meal', () => {
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_IMG}`))
      .toHaveAttribute('src', doneRecipes[0].image);
    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_TOP_TEXT}`))
      .toHaveTextContent(`${doneRecipes[0].nationality} - ${doneRecipes[0].category}`);
    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[0].name);
    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_DONE_DATE}`))
      .toHaveTextContent(doneRecipes[0].doneDate);
    expect(screen.getByTestId(`${ZERO}-${TAG_MOCKED_CURRY}-${TEST_ID_HORIZONTAL_TAG}`))
      .toHaveTextContent(doneRecipes[0].tags[1]);
    expect(screen.getByTestId(`${ZERO}-${TAG_MOCKED_PASTA}-${TEST_ID_HORIZONTAL_TAG}`))
      .toHaveTextContent(doneRecipes[0].tags[0]);
    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_SHARE_BTN}`))
      .toHaveAttribute('src', expect.stringMatching(/shareIcon/i));
  });

  it('should display correct attributes for any given drink', () => {
    renderWithRouter(<DoneRecipes />);

    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_IMG}`))
      .toHaveAttribute('src', doneRecipes[1].image);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_TOP_TEXT}`))
      .toHaveTextContent(doneRecipes[1].alcoholicOrNot);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[1].name);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_DONE_DATE}`))
      .toHaveTextContent(doneRecipes[1].doneDate);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_IMG}`))
      .toHaveAttribute('src', doneRecipes[1].image);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_SHARE_BTN}`))
      .toHaveAttribute('src', expect.stringMatching(/shareIcon/i));
  });

  it('should filter recipes correctly', () => {
    renderWithRouter(<DoneRecipes />);

    userEvent.click(screen.getByRole(...ROLE_BTN_MEALS));

    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[0].name);
    expect(screen.queryByTestId(`${ONE}-${TEST_ID_HORIZONTAL_NAME}`))
      .not.toBeInTheDocument();

    userEvent.click(screen.getByRole(...ROLE_BTN_DRINKS));

    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[1].name);
    expect(screen.queryByTestId(`${ONE}-${TEST_ID_HORIZONTAL_NAME}`))
      .not.toBeInTheDocument();

    userEvent.click(screen.getByRole(...ROLE_BTN_ALL));

    expect(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[0].name);
    expect(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_NAME}`))
      .toHaveTextContent(doneRecipes[1].name);
  });

  it('should display the message "Link copied!" when the share button is clicked', async () => {
    renderWithRouter(<DoneRecipes />);

    userEvent.click(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_SHARE_BTN}`));

    await waitFor(() => expect(screen.getByText(/Link copied!/i)).toBeInTheDocument());
  });

  it('should copy the recipe details URL to clipboard upon share button click', async () => {
    renderWithRouter(<DoneRecipes />);

    userEvent.click(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_SHARE_BTN}`));

    await waitFor(() => expect(navigator.clipboard.readText())
      .toHaveTextContent(URL_DETAILS_MEAL));
  });

  it('should redirect to the corresponding details page when clicking on the card image', async () => {
    const { history: { location: { pathname } } } = renderWithRouter(<DoneRecipes />);

    userEvent.click(screen.getByTestId(`${ZERO}-${TEST_ID_HORIZONTAL_IMG}`));

    await waitFor(() => expect(pathname).toBe(ROUTE_MOCKED_MEAL));
  });

  it('should redirect to the corresponding details page when clicking on the card name', async () => {
    const { history: { location: { pathname } } } = renderWithRouter(<DoneRecipes />);

    userEvent.click(screen.getByTestId(`${ONE}-${TEST_ID_HORIZONTAL_NAME}`));

    await waitFor(() => expect(pathname).toBe(ROUTE_MOCKED_DRINK));
  });
});
