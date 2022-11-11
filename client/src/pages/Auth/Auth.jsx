/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/user/userSlice';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import logo from '../../images/big-logo.png';
import paths from '../../utils/paths';
import './Auth.scss';

export const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);

  const click = () => {
    try {
      dispatch(loginUser({ email, password }));
      navigate(paths.personalAccount);
    } catch (e) {
      console.log(e);
      setError('Invalid email or password');
    }
  };

  const clickEnter = (event) => {
    if (event.key === 'Enter') {
      click();
    }
  };

  useEffect(() => {
    if (user) {
      navigate(paths.home);
    }
  }, []);

  return (
    <div className="registr">
      <div className="registr-logo">
        <Link to={paths.home}>
          <img className="registr-logo-title" src={logo} alt="logo" />
        </Link>
        <h5 className="registr-logo-subtitle">Find your home here</h5>
      </div>
      <div className="registr-right">
        <form className="registr-form">
          <h4 className="registr-form-title">Login</h4>
          <div className="auth-input">
            <Input
              type="mail"
              placeholder="Enter email"
              text="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="auth-input">
            <Input
              type="password"
              placeholder="Enter password"
              text="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyPress={(e) => clickEnter(e)}
            />
          </div>
          <div className="registr-send">
            <div className="registr-error">{error}</div>
            <div className="registr-send-wrapper">
              <Button type="blue" size="l" onClick={click}>
                Login
              </Button>
            </div>
            <p className="registr-send-message">
              Don’t have an account?
              <Link className="registr-link" to={paths.registration}>
                Registration!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
