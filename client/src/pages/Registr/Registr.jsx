/* eslint-disable operator-linebreak */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useInput } from '../../hooks/validation';
import {
  registrationUser,
  selectState,
  setError,
} from '../../store/user/userSlice';
import { Dropdown } from '../../components/Dropdown';
import logo from '../../images/big-logo.png';
import paths from '../../utils/paths';
import './Registr.scss';

export const Registr = () => {
  const firstName = useInput('', { isEmpty: true });
  const lastName = useInput('', { isEmpty: true });
  const email = useInput('', { isEmail: true });
  const password = useInput('', { minLength: 6 });
  const phone = useInput('', { isPhone: true });
  const [sex, setSex] = useState('');
  const [city, setCity] = useState();
  const error = useSelector((state) => state.user.error);
  const [img, setImg] = useState(null);
  const isAuth = useSelector(selectState);

  const [inputValid, setInputValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth) {
      navigate(paths.personalAccount);
    }
  }, [isAuth]);

  useEffect(() => {
    if (
      firstName.isEmpty ||
      lastName.isEmpty ||
      email.emailError ||
      password.minLengthError ||
      phone.phoneError ||
      !city ||
      !sex ||
      !img
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [firstName, lastName, email, password, phone]);

  const handleCreateUser = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', firstName.value);
      formData.append('lastName', lastName.value);
      formData.append('email', email.value);
      formData.append('city', city);
      formData.append('sex', sex);
      formData.append('password', password.value);
      formData.append('img', img);
      formData.append('phone', phone.value);
      await dispatch(registrationUser(formData));
      setError('Success!');
    } catch (e) {
      console.log(e);
    }
  };

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
          <h4 className="registr-form-title">Create account</h4>

          <div className="registr-input">
            <Input
              type="text"
              placeholder=""
              text="First name"
              value={firstName.value}
              onBlur={firstName.onBlur}
              onChange={firstName.onChange}
            />
          </div>
          <div className="registr-input">
            <Input
              type="text"
              placeholder=""
              text="Last name"
              value={lastName.value}
              onBlur={lastName.onBlur}
              onChange={lastName.onChange}
            />
          </div>
          <div className="registr-input">
            {email.isDirty && email.emailError && (
              <div className="registr-error">
                You should use mail in format: example@example.com
              </div>
            )}
            <Input
              type="mail"
              placeholder=""
              text="Email"
              value={email.value}
              onBlur={email.onBlur}
              onChange={email.onChange}
            />
          </div>
          <div className="registr-input">
            {password.isDirty && password.minLengthError && (
              <div className="registr-error">
                Minimum password length of at least 6 characters
              </div>
            )}
            <Input
              type="password"
              placeholder=""
              text="Password"
              value={password.value}
              onBlur={password.onBlur}
              onChange={password.onChange}
            />
          </div>
          <div className="registr-input">
            <div className="registr-input-container">
              <h5>City</h5>
              <Dropdown
                size="m"
                selected={city}
                setSelected={setCity}
                options={[
                  'Minsk',
                  'Grodno',
                  'Brest',
                  'Gomel',
                  'Mogilev',
                  'Vitebsk',
                ]}
              />
            </div>
          </div>
          <div className="registr-input">
            <div className="registr-input-container">
              <h5>Sex</h5>
              <Dropdown
                size="m"
                selected={sex}
                setSelected={setSex}
                options={['Men', 'Women']}
              />
            </div>
          </div>
          <div className="registr-input">
            {phone.isDirty && phone.phoneError && (
              <div className="registr-error">Incorrect phone number</div>
            )}
            <Input
              type="phone"
              placeholder=""
              text="Phone"
              value={phone.value}
              onBlur={phone.onBlur}
              onChange={phone.onChange}
            />
          </div>
          <div className="registr-input-upload">
            <Input
              size="l"
              type="file"
              text="Add avatar"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
          </div>

          <div className="registr-send">
            <div className="registr-error">{error}</div>
            <div className="registr-send-wrapper">
              <Button
                type="blue"
                size="l"
                onClick={handleCreateUser}
                disabled={inputValid ? false : true}
                className={inputValid ? '' : 'disabled'}
              >
                Create account
              </Button>
            </div>
            <p className="registr-send-message">
              Already have an account?
              <Link className="registr-link" to={paths.auth}>
                Login!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
