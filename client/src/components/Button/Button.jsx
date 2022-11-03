import classNames from 'classnames';
import React from 'react';
import './Button.scss';

export const Button = ({
  onClick,
  type,
  id,
  size = 'm',
  children,
  style,
  className,
  disabled,
}) => {
  const btnClass = classNames({
    btn: true,
    'btn--clear': type === 'clear',
    'btn--blue': type === 'blue',
    'btn--orange': type === 'orange',
    'btn--small': size === 's',
    'btn--medium': size === 'm',
    'btn--large': size === 'l',
  });
  return (
    <button
      style={style}
      className={`${btnClass} ${className}`}
      id={id}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
