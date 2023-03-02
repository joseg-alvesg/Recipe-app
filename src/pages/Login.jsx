import React from 'react';

export default function Login() {
  return (
    <div>
      <section>
        login image
      </section>
      <section>
        <input
          type="text"
          data-testid="email-input"
        />
        <input
          type="password"
          data-testid="password-input"
        />
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          login
        </button>
      </section>
    </div>
  );
}
