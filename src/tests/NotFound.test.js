import { screen } from '@testing-library/react';
import {
  NOT_FOUND,
  ROLE_HEADING_404,
  ROLE_IMG_404,
  TEST_ID_BTN_BOT_DRINKS,
  TEST_ID_BTN_BOT_MEALS,
  TEST_ID_BTN_TOP_PROFILE,
} from '../helpers/constants';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('The NotFound page', () => {
  it('should render all elements correctly', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByTestId(TEST_ID_BTN_TOP_PROFILE)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_HEADING_404)).toBeInTheDocument();
    expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
    expect(screen.getByRole(...ROLE_IMG_404)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_BOT_DRINKS)).toBeInTheDocument();
    expect(screen.getByTestId(TEST_ID_BTN_BOT_MEALS)).toBeInTheDocument();
  });
});
