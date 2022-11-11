import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Cover } from '../Cover';
import { getApartment } from '../../store/apartment/apartmentSlice';
import { setFilterLocation } from '../../store/filter/filterSlice';
import paths from '../../utils/paths';
import './CityCard.scss';

export const CityCard = ({ location }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { city } = location;

  const handleClick = () => {
    dispatch(setFilterLocation(city));
    dispatch(
      getApartment({
        city,
      })
    );
    navigate(paths.apartment);
  };
  return (
    <div className="city-item" aria-hidden="true" onClick={handleClick}>
      <Cover name={location.city} image={location.img} />
    </div>
  );
};
