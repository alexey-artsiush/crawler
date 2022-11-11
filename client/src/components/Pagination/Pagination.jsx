/* eslint-disable no-plusplus */
import React from 'react';
import './Pagination.scss';

export const Pagination = ({
  totalItems,
  paginate,
  itemsPerPage,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {pages.length > 1 ? (
        <button onClick={() => prevPage()} size="s" type="button">
          {'<'}
        </button>
      ) : null}
      {pages.map((number) => {
        return (
          <div
            className={
              currentPage === number
                ? 'pagination-item-acive'
                : 'pagination-item'
            }
            key={number}
          >
            <li aria-hidden="true" onClick={() => paginate(number)}>
              {number}
            </li>
          </div>
        );
      })}
      {pages.length > 1 ? (
        <button onClick={() => nextPage()} type="button" size="s">
          {'>'}
        </button>
      ) : null}
    </div>
  );
};
