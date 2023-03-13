import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import { MIN_PASSWORD_LENGTH } from '../../helpers/constants';
import { setLocalStorage } from '../../helpers/localStorage';
import style from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const validation = () => validator.isEmail(email) && password.length
   > MIN_PASSWORD_LENGTH;

  const handleClick = () => {
    setLocalStorage('user', { email });
    history.push('/meals');
  };

  return (
    <div className={ style.container }>
      <section className={ style.section }>
        <input
          placeholder="E-mail"
          type="email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          placeholder="Password"
          type="password"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          className={ style.button }
          type="button"
          data-testid="login-submit-btn"
          disabled={ !validation() }
          onClick={ handleClick }
        >
          Login
        </button>
      </section>
    </div>
  );
}
