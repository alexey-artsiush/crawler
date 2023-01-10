import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import './Dropdown.scss';

export const Dropdown = ({ selected, setSelected, options, size = 's' }) => {
  const dropdownClass = classNames({
    dropdown: true,
    'dropdown--small': size === 's',
    'dropdown--medium': size === 'm',
    'dropdown--large': size === 'l',
  });
  const [isActive, setIsActive] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className={dropdownClass} ref={menuRef}>
      <div
        aria-hidden="true"
        className="dropdown-btn"
        onClick={() => {
          setIsActive(!isActive);
        }}
      >
        {selected}
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => {
            return (
              <div key={option}>
                <div
                  aria-hidden="true"
                  onClick={() => {
                    setSelected(option);
                    setIsActive(false);
                  }}
                  className="dropdown-item"
                >
                  {option}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
