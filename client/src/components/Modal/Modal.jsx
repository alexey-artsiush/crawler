import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button';
import './Modal.scss';

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={active ? 'modal-content active' : 'modal-content'}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-container">
          <Button size="s" type="orange" onClick={() => setActive(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};
