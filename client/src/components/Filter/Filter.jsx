/* eslint-disable object-curly-newline */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  setFilterLease,
  setFilterLocation,
  setFilterMaxPrice,
  setFilterMinPrice,
  setFilterRooms,
} from '../../store/filter/filterSlice';
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
  const [minPrice, setMinPrice] = useState(filter.minPrice);
  const [maxPrice, setMaxPrice] = useState(filter.maxPrice);

  useEffect(() => {
    dispatch(setFilterLocation(city));
    dispatch(setFilterRooms(leavingRoom));
    dispatch(setFilterLease(rentalPeriod));
    dispatch(setFilterMinPrice(minPrice));
    dispatch(setFilterMaxPrice(maxPrice));
  }, []);

  const click = () => {
    dispatch(
      getApartment({
        city,
        leavingRoom,
        rentalPeriod,
        minPrice,
        maxPrice,
      })
    );
    navigate(paths.apartment);
  };

  return (
    <div className="filter">
      <div className="filter-header">
        <div className="filter-banner">
          <h3>Find your apartment here</h3>
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
              'All offers',
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
            options={['All offers', '1', '2', '3', '4']}
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
            options={['All offers', 'Short-term', 'Long-term']}
          />
        </div>

        <div className="filter-point">
          <div className="filter-title">
            <span>Price, $</span>
          </div>
          <div className="filter-point-wrapper">
            <div className="filter-point">
              <div className="filter-point-price dropdown dropdown--medium">
                <input
                  type="number"
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="from"
                />
                <input
                  type="number"
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="to"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-dropdown-wrapper">
          <div className="filter-wrapper">
            <Button
              size="l"
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
    </div>
  );
};
