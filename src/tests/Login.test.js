import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const EMAIL_INPUT = 'test@test.com';
const PASSWORD_TEST_ID = 'password-input';

describe('Testa o componente Login', () => {
  it('Testa se o componente Login contém um input de email', () => {
    renderWithRouter(<App />);

    const email = screen.getByTestId(PASSWORD_TEST_ID);
    expect(email).toBeInTheDocument();
  });

  it('Testa se o componente Login contém um input de senha', () => {
    renderWithRouter(<App />);
    const password = screen.getByTestId(PASSWORD_TEST_ID);
    expect(password).toBeInTheDocument();
  });

  it('Testa se o componente Login contém um botão de login', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);
    expect(button).toBeInTheDocument();
  });

  it('Testa se o botão está desabilitado quando os campos não estão preenchidos', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);
    expect(button).toBeDisabled();
  });

  it('Testa se o botão está habilitado quando os campos estão preenchidos', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);
    expect(button).toBeDisabled();

    userEvent.type(email, EMAIL_INPUT);
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });

  it('Testa se as informações são salvas no localStorage', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId(LOGIN_SUBMIT_BTN);

    userEvent.type(email, EMAIL_INPUT);
    userEvent.type(password, '1234567');
    userEvent.click(button);

    const user = JSON.parse(localStorage.getItem('user'));
    expect(user).toEqual({ email: EMAIL_INPUT });
  });
});
