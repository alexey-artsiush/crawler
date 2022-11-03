import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationItem.scss';

export const NavigationItem = ({ item, isActive }) => {
  const navigate = useNavigate();
  return (
    <div
      className={isActive ? 'navigation-item-active' : 'navigation-item'}
      aria-hidden="true"
      onClick={() => navigate(item.path)}
    >
      {item.title}
    </div>
  );
};
