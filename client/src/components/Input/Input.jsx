import React from 'react';
import classNames from 'classnames';
import './Input.scss';

export const Input = ({
  onClick,
  min,
  max,
  onBlur,
  type = 'text',
  name = '',
  placeholder = '',
  onChange = () => {},
  error = '',
  text = '',
  size = 'm',
  onKeyPress,
  value,
  maxLength,
}) => {
  const btnClass = classNames({
    input: true,
    'input--small': size === 's',
    'input--medium': size === 'm',
    'input--large': size === 'l',
  });
  return (
    <div className="container">
      <h5>{text}</h5>
      <input
        onClick={onClick}
        min={min}
        max={max}
        maxLength={maxLength}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        type={type}
        name={name}
        className={btnClass}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};
