import React, { useState } from 'react';
import validator from 'validator';
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../../helpers/constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => validator.isEmail(email) && password.length
   >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH;

  return (
    <div>
      <section>
        login image
      </section>
      <section>
        <input
          type="text"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validation() }
        >
          login
        </button>
      </section>
    </div>
  );
}
