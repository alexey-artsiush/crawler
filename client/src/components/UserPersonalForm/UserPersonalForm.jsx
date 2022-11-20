/* eslint-disable no-unneeded-ternary */
/* eslint-disable object-curly-newline */
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/validation';
import { updateUser } from '../../store/services/userService';
import { logoutUser, setLogout, setUser } from '../../store/user/userSlice';
import paths from '../../utils/paths';
import { Button } from '../Button';
import { Cover } from '../Cover';
import { Dropdown } from '../Dropdown';
import { Input } from '../Input';
import { Spinner } from '../Spinner';
import './UserPersonalForm.scss';

export const UserPersonalForm = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(user.firstName);
  const [lastname, setLastname] = useState(user.lastName);
  const [city, setCity] = useState(user.city);
  const phone = useInput(user.phone, { isPhone: true });
  const [error, setError] = useState('');
  const [img, setImg] = useState(user.img);
  const email = useInput(user.email, { isEmail: true });

  const [inputValid, setInputValid] = useState(false);

  const loading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    if (email.emailError || phone.phoneError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [email, phone]);

  const handleUpdateAccount = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('firstName', name);
      formData.append('lastName', lastname);
      formData.append('email', email.value);
      formData.append('city', city);
      formData.append('phone', phone.value);
      formData.append('role', user.role);
      formData.append('sex', user.sex);
      formData.append('img', user.img);
      await updateUser(formData);
      dispatch(setUser(formData));
      dispatch(logoutUser());
      dispatch(setLogout());
      navigate(paths.auth);
    } catch (e) {
      setError(`${e.response.data.err.messagee}`);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="personal-account-cont">
      <div className="personal-account-content">
        <div className="personal-account-items">
          <Input
            size="s"
            type="text"
            value={name}
            text="Firstname"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            size="s"
            type="text"
            value={lastname}
            text="Lastname"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
          <Input
            size="s"
            type="text"
            value={email.value}
            text="Email"
            onBlur={email.onBlur}
            onChange={email.onChange}
          />
          <Input
            size="s"
            type="text"
            value={phone.value}
            text="Phone"
            onBlur={phone.onBlur}
            onChange={phone.onChange}
          />
          <div className="registr-input-container">
            <h5>City</h5>
            <Dropdown
              size="s"
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
        <div className="personal-photo">
          <Cover size="m" image={user.img} />
          <div className="personal-photo-update">
            <input type="file" onChange={setImg} />
            <button type="button">
              <FontAwesomeIcon icon={faDownload} />
              Upload
            </button>
          </div>
          <div className="list-upload">
            {img ? `${img}` : ''}
            {img ? (
              <button type="button" onClick={() => setImg('')}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <div className="personal-account-wrapper">
        <div className="personal-account-button">
          <Button
            type="orange"
            onClick={handleUpdateAccount}
            disabled={inputValid ? false : true}
            className={inputValid ? 'active' : 'disabled'}
          >
            Update
          </Button>
        </div>
        <h6 className="personal-info">
          You will be logged out of your account to update your data.
        </h6>
      </div>
      <div className="registr-error">{error}</div>
    </div>
  );
};
