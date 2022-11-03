import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavigationItem } from './NavigationItem';
import { Button } from '../Button';
import { logout } from '../../store/services/userService';
import { setLogout } from '../../store/user/userSlice';
import paths from '../../utils/paths';
import './Navigation.scss';

export const Navigation = ({ user }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userNavigation = [
    {
      isActive: pathname === paths.personalAccount,
      title: 'My profile',
      path: paths.personalAccount,
      id: 1,
    },
    {
      isActive: pathname === paths.personalObjects,
      title: 'My objects',
      path: paths.personalObjects,
      id: 2,
    },
    {
      isActive: pathname === paths.createApartment,
      title: 'Add an ad',
      path: paths.createApartment,
      id: 8,
    },
  ];

  const adminNavigation = [
    {
      isActive: pathname === paths.personalAccount,
      title: 'My profile',
      path: paths.personalAccount,
      id: 3,
    },
    {
      isActive: pathname === paths.personalObjects,
      title: 'My objects',
      path: paths.personalObjects,
      id: 4,
    },
    {
      isActive: pathname === paths.createApartment,
      title: 'Add an ad',
      path: paths.createApartment,
      id: 8,
    },
    {
      isActive: pathname === paths.personalNews,
      title: 'Add news',
      path: paths.personalNews,
      id: 5,
    },
  ];

  return (
    <div className="personal-aсcount-menu">
      {user.role === 'USER' ? (
        <div className="navigation">
          <div className="navigation-user">
            {user.firstName}
            &nbsp;
            {user.lastName}
          </div>
          {userNavigation.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={item.isActive}
            />
          ))}
          <Button
            size="s"
            type="orange"
            onClick={() => {
              logout();
              navigate(paths.home);
              dispatch(setLogout());
            }}
          >
            Exit
          </Button>
        </div>
      ) : (
        <div className="navigation">
          <div className="navigation-user">
            {user.firstName}
            &nbsp;
            {user.lastName}
          </div>
          {adminNavigation.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={item.isActive}
            />
          ))}
          <Button
            size="s"
            type="orange"
            onClick={() => {
              logout();
              navigate(paths.home);
              dispatch(setLogout());
            }}
          >
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
