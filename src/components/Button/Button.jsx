import React from 'react';

function Button({ isSubmit, children, ...other }) {
  return (
    <button
      className="button is-primary has-text-weight-bold"
      type={isSubmit ? 'submit' : 'button'}
      {...other}>
      {children}
    </button>
  );
}

export default Button;
