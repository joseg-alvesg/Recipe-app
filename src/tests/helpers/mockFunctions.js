import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ROLE_BTN_LOGIN,
  TEST_ID_INPUT_EMAIL,
  TEST_ID_INPUT_PASSWORD,
  VALID_EMAIL,
  VALID_PASSWORD,
} from '../../helpers/constants';

export const logInWithValidCredentials = () => {
  userEvent.type(screen.getByTestId(TEST_ID_INPUT_EMAIL), VALID_EMAIL);
  userEvent.type(screen.getByTestId(TEST_ID_INPUT_PASSWORD), VALID_PASSWORD);
  userEvent.click(screen.getByRole(...ROLE_BTN_LOGIN));
};
