import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilterLease, setFilterLocation, setFilterRooms } from '../../store/filter/filterSlice';
import { Dropdown } from '../Dropdown';
import { Button } from '../Button';
import { getApartment } from '../../store/apartment/apartmentSlice';
import paths from '../../utils/paths';
import './Filter.scss';

export const Filter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);
  const [city, setSelectedLocation] = useState(filter.location);
  const [leavingRoom, setSelectedRooms] = useState(filter.leavingRoom);
  const [rentalPeriod, setSelectedRentalPeriod] = useState(filter.rentalPeriod);

  useEffect(() => {
    dispatch(setFilterLocation(city));
    dispatch(setFilterRooms(leavingRoom));
    dispatch(setFilterLease(rentalPeriod));
  }, []);

  const click = () => {
    dispatch(
      getApartment({
        city,
        leavingRoom,
        rentalPeriod,
      })
    );
    navigate(paths.apartment);
  };

  return (
    <div className="filter">
      <div className="filter-header">
        <div className="filter-banner">
          <h3>Find you apartment here</h3>
          <h4>Apartment rental for short and long term</h4>
        </div>
      </div>
      <div className="filter-panel">
        <div className="filter-point">
          <div className="filter-title">
            <span>Location</span>
          </div>
          <Dropdown
            size="m"
            selected={city}
            setSelected={setSelectedLocation}
            options={[
              'Minsk',
              'Grodno',
              'Brest',
              'Mogilev',
              'Gomel',
              'Vitebsk',
            ]}
          />
        </div>
        <div className="filter-point">
          <div className="filter-title">
            <span>Rooms</span>
          </div>
          <Dropdown
            size="m"
            selected={leavingRoom}
            setSelected={setSelectedRooms}
            options={[1, 2, 3, 4]}
          />
        </div>
        <div className="filter-point">
          <div className="filter-title">
            <span>Lease</span>
          </div>
          <Dropdown
            size="m"
            selected={rentalPeriod}
            setSelected={setSelectedRentalPeriod}
            options={['short-term', 'long-term']}
          />
        </div>
        <div className="filter-wrapper">
          <Button
            type="orange"
            onClick={() => {
              click();
            }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};
