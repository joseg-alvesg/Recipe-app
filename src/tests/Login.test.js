import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Testa o componente Login', () => {
  it('Testa se o componente Login contém um input de email', () => {
    render(<Login />);
    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();
  });

  it('Testa se o componente Login contém um input de senha', () => {
    render(<Login />);
    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });

  it('Testa se o componente Login contém um botão de login', () => {
    render(<Login />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
  });

  it('Testa se o botão está desabilitado quando os campos não estão preenchidos', () => {
    render(<Login />);
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();
  });

  it('Testa se o botão está habilitado quando os campos estão preenchidos', () => {
    render(<Login />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeDisabled();

    userEvent.type(email, 'test@test.com');
    userEvent.type(password, '1234567');
    expect(button).toBeEnabled();
  });
});
