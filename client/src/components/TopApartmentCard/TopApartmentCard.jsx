import React from 'react';
import { Link } from 'react-router-dom';
import { Cover } from '../Cover';
import paths from '../../utils/paths';
import './TopApartmentCard.scss';

export const TopApartmentCard = ({ apartment }) => {
  return (
    <div className="city-item">
      <Link to={`${paths.apartment}/${apartment.id}`}>
        <Cover image={apartment.photos[0].img} />
        <div className="apartment-description">
          <div className="apartment-name">{apartment.name}</div>
          <div className="apartment-address">{apartment.address}</div>
          <div className="apartment-price">
            {apartment.price}
            USD/month
          </div>
        </div>
      </Link>
    </div>
  );
};
