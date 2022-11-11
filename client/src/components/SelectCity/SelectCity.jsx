/* eslint-disable indent */
import React from 'react';
import { CityCard } from '../CityCard';
import './SelectCity.scss';

export const SelectCity = ({ cities }) => {
  return (
    <div className="select-city">
      <div className="city-header">
        <h2>Select city</h2>
      </div>
      <div className="select-content">
        {cities
          ? cities.map((location) => {
              return (
                <div className="select-one" key={location.id}>
                  <CityCard location={location} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
