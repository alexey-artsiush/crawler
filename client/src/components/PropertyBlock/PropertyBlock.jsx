import React from 'react';
import './PropertyBlock.scss';

export const PropertyBlock = ({ title = 'Property news' }) => {
  return (
    <div
      className="property-block"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(47, 133, 235, 0.8) 0%, rgba(42, 137, 240, 0.8) 100%), url(../../images/background.jpg)',
      }}
    >
      <h3>{title}</h3>
    </div>
  );
};
