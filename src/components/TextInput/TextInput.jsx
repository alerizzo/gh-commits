import React from 'react';

function TextInput({ isInvalid, invalidMessage, className, ...other }) {
  return (
    <div className="TextInput control" data-error={isInvalid ? invalidMessage : null}>
      <input
        className={`input ${isInvalid ? 'is-danger' : ''} ${className || ''}`}
        type="text"
        {...other}
      />
    </div>
  );
}

export default TextInput;
