/* eslint-disable indent */
import React from 'react';
import { ApartmentCard } from '../ApartmentCard';
import './SearchResult.scss';

export const SearchResult = ({ apartment, count }) => {
  return (
    <div className="search-result" data-testid="result-apartmentId">
      {apartment
        ? `Found ${count} ${
            count === 1 || count === 0 ? 'apartment' : 'apartments'
          } `
        : null}
      <div className="search-cards">
        {count ? (
          apartment.map((apart) => {
            return (
              <ApartmentCard
                key={apart.id}
                apart={apart}
                luxury={apart.premium}
              />
            );
          })
        ) : (
          <h4>No found</h4>
        )}
      </div>
    </div>
  );
};
