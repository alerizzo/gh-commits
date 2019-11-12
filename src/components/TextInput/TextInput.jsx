import React from 'react';

function TextInput({ isInvalid, isLoading, invalidMessage, className, style, ...other }) {
  return (
    <div
      className={`TextInput control ${isLoading ? 'is-loading' : ''}`}
      style={style}
      data-error={isInvalid ? invalidMessage : null}>
      <input
        className={`input ${isInvalid ? 'is-danger' : ''} ${className || ''}`}
        type="text"
        {...other}
      />
    </div>
  );
}

export default TextInput;
