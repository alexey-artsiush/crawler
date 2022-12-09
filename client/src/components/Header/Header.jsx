import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '../../images/logo.png';
import { Button } from '../Button';
import { setLogout } from '../../store/user/userSlice';
import { logout } from '../../store/services/userService';
import paths from '../../utils/paths';
import './Header.scss';

export const Header = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header-logo">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate(paths.home);
          }}
          aria-hidden="true"
        />
      </div>
      {user ? (
        <div className="header-buttons">
          <div className="header-user-photo">
            <img
              onClick={() => {
                navigate(paths.personalAccount);
              }}
              aria-hidden="true"
              src={`${process.env.REACT_APP_API_URL}/${user.img}`}
              alt="user"
            />
          </div>
          <Button
            type="orange"
            size="s"
            onClick={() => {
              logout();
              navigate(paths.home);
              dispatch(setLogout());
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="header-buttons">
          <Button
            type="clear"
            onClick={() => {
              navigate(paths.registration);
            }}
          >
            Register
          </Button>
          <Button
            type="clear"
            onClick={() => {
              navigate(paths.auth);
            }}
          >
            Sign in
          </Button>
        </div>
      )}
    </div>
  );
};
