import React from 'react';
import classNames from 'classnames';
import './Cover.scss';

export const Cover = ({ image = '', name, size = 's' }) => {
  const coverClass = classNames({
    cover: true,
    'cover--xsmall': size === 'xs',
    'cover--small': size === 's',
    'cover--medium': size === 'm',
    'cover--large': size === 'l',
  });
  return (
    <div
      className={coverClass}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_URL}/${image})`,
      }}
    >
      <span className="city-title">{name}</span>
    </div>
  );
};
