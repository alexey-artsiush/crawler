import React from 'react';
import './DetailCard.scss';

export const DetailCard = ({ title, value }) => {
  return (
    <div className="detail-card">
      <div className="detail-card-title">
        <div className="card-title-wrapper">{title}</div>
      </div>
      <div className="detail-card-value">
        <div className="card-value-wrapper">
          {value === 'undefined' ? '-' : value}
        </div>
      </div>
    </div>
  );
};
