import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Header from '../components/Header';
import SearchProvider from '../contexts/SearchProvider';
import renderWithRouter from './renderWithRouter';

const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL_INPUT = 'test@test.com';
const BUTTON_ID = 'exec-search-btn';

describe('Testa o componente SearchBar', () => {
  it('Testa se renderiza os elementos do componente', () => {
    renderWithRouter(
      <SearchProvider>
        <Header />
      </SearchProvider>,
    );

    const button = screen.getByTestId('search-top-btn');
    expect(button).toBeInTheDocument();

    expect(screen.getAllByRole('button').length).toBe(2);

    userEvent.click(button);

    expect(screen.getByTestId(BUTTON_ID)).toBeInTheDocument();

    expect(screen.getAllByRole('radio').length).toBe(3);

    expect(screen.getAllByRole('button').length).toBe(3);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('Testa se os filtros de pesquisa', async () => {
    renderWithRouter(
      <App />,
    );

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);
    const alertMock = jest.spyOn(global, 'alert').mockImplementation();

    userEvent.type(email, EMAIL_INPUT);
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    const execButton = screen.getByTestId(BUTTON_ID);

    userEvent.type(searchInput, 'x');
    expect(searchInput).toHaveValue('x');

    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(execButton);

    userEvent.type(searchInput, '{backspace}Ar');
    expect(searchInput).toHaveValue('Ar');
    userEvent.click(execButton);

    expect(alertMock).toBeCalled();

    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(execButton);

    expect(await screen.findByTestId('0-recipe-card'));

    userEvent.type(searchInput, 'rabiata');
    expect(searchInput).toHaveValue('Arrabiata');

    userEvent.click(screen.getByTestId(BUTTON_ID));
    expect(await screen.findByText(/Ingredients/i, {}, { timeout: 3000 })).toBeInTheDocument();
  });
});
