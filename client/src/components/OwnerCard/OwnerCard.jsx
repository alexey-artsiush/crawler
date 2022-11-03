import React from 'react';
import { Cover } from '../Cover';
import './OwnerCard.scss';

export const OwnerCard = ({ ownerImage, ownerPhone, ownerName }) => {
  return (
    <div className="owner-card">
      <div className="owner-card-photo">
        <Cover size="xs" image={ownerImage} />
      </div>
      <div className="owner-card-user">
        <div className="owner-card-user-name">{ownerName}</div>
        <div className="owner-card-user-phone">{ownerPhone}</div>
      </div>
    </div>
  );
};
