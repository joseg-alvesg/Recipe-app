import PropTypes from 'prop-types';
import React from 'react';

function Button({
  children,
  dataTestId = '',
  disabled = false,
  name = '',
  onClick = null,
  submitBtn = false,
  id = '',
  buttons = '',
}) {
  return (
    <button
      className={ buttons }
      id={ id }
      data-testid={ dataTestId }
      disabled={ disabled }
      name={ name }
      onClick={ onClick }
      type={ submitBtn ? 'submit' : 'button' }
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  buttons: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  submitBtn: PropTypes.bool,
};

export default Button;
