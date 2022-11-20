import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Cover } from '../Cover';
import paths from '../../utils/paths';
import './CityChatCard.scss';

export const CityChatCard = ({ location }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${paths.chat}/${location.city}`);
  };
  return (
    <div className="city-item" aria-hidden="true" onClick={handleClick}>
      <Cover name={location.city} image={location.img} />
    </div>
  );
};
