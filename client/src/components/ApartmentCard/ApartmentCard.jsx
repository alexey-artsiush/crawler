import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSubway, faStar, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Cover } from '../Cover';
import { Button } from '../Button';
import { setCurrentApartment, updatePremiumStatus } from '../../store/apartment/apartmentSlice';
import { Spinner } from '../Spinner';
import { selectUser } from '../../store/user/userSlice';
import paths from '../../utils/paths';
import './ApartmentCard.scss';

export const ApartmentCard = ({ apart, luxury }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPremium, setIsPremium] = useState(luxury);
  const apartId = apart.id;
  const premium = !isPremium;

  const changeTypeAdClick = (event) => {
    event.stopPropagation();
    setIsPremium(!isPremium);
    dispatch(updatePremiumStatus({
      apartId,
      premium,
    }));
  };

  const editClick = (event) => {
    event.stopPropagation();
    navigate(`${paths.editPage}/${apart.id}`);
  };

  return (
    <div
      className={`apartment-card ${isPremium === true ? 'premium' : ''}`}
      aria-hidden="true"
      onClick={() => {
        dispatch(setCurrentApartment(apart));
        navigate(`${paths.apartment}/${apart.id}`);
      }}
    >
      <div className="apartment-photo">
        {apart.photos[0].img === undefined ? (
          <Spinner />
        ) : (
          <Cover image={apart.photos[0].img} />
        )}
        <span className="apartment-card-price">
          {apart.price}
          $/month
        </span>
      </div>
      <div className="apartment-card-content">
        <div className="apartment-card-title">
          <div className="apartment-card-name">{apart.name}</div>
          <div className="apartment-card-id">
            ID:
            {apart.id}
          </div>
        </div>
        <div className="apartment-card-address">
          <FontAwesomeIcon icon={faMapMarker} />
          &nbsp;
          {apart.address}
        </div>
        <div className="apartment-card-metro">
          <FontAwesomeIcon icon={faSubway} />
          &nbsp;
          {apart.metro === 'undefined' ? '-' : apart.metro}
        </div>
        <div className="apartment-card-characteristics">
          <div className="apartment-card-characteristic">
            <span>{apart.square}</span>
            <span>Square</span>
          </div>
          <div className="apartment-card-characteristic">
            <span>{apart.leavingRoom}</span>
            <span>Room</span>
          </div>
          <div className="apartment-card-characteristic">
            <span>{apart.yearBuilt}</span>
            <span>Year</span>
          </div>
        </div>
        <div className="apartment-card-description">{apart.description}</div>
      </div>
      <div
        className={`apartment-card-panel ${isPremium ? 'active-status' : ''}`}
      >
        {user && user.role === 'ADMIN' ? (
          <FontAwesomeIcon
            onClick={changeTypeAdClick}
            icon={faStar}
          />
        ) : null}
        {user && user.id === apart.userId ? (
          <Button
            type="orange"
            size="s"
            onClick={editClick}
          >
            Edit
          </Button>
        ) : null}
      </div>
    </div>
  );
};
