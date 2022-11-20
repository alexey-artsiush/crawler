/* eslint-disable indent */
import React from 'react';
import { CityChatCard } from '../CityChatCard';
import './SelectCityChat.scss';

export const SelectCityChat = ({ cities }) => {
  return (
    <div className="select-city">
      <div className="city-header">
        <h2>Select chat</h2>
      </div>
      <div className="select-content">
        {cities
          ? cities.map((location) => {
              return (
                <div className="select-one" key={location.id}>
                  <CityChatCard location={location} />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};
