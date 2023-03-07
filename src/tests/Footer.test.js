import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Routes from '../routes/index';
import SearchProvider from '../contexts/SearchProvider';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente Footer', () => {
  test('1-Testa o botão Comidas do Footer', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <Routes />
      </SearchProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const botaoComida = screen.getByTestId('meals-bottom-btn');
    await waitFor(() => expect(botaoComida).toBeInTheDocument());
    userEvent.click(botaoComida);
    expect(history.location.pathname).toBe('/meals');
  });

  test('2-Testa o botão Bebidas do Footer', async () => {
    const { history } = renderWithRouter(
      <SearchProvider>
        <Routes />
      </SearchProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const botaoBebida = screen.getByTestId('drinks-bottom-btn');
    expect(botaoBebida).toBeInTheDocument();
    userEvent.click(botaoBebida);
    expect(history.location.pathname).toBe('/drinks');
  });
});
