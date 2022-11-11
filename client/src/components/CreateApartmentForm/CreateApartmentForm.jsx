/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { Dropdown } from '../Dropdown';
import { FileUpload } from '../FileUpload';
import { Input } from '../Input';
import { selectUser } from '../../store/user/userSlice';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import { Spinner } from '../Spinner';
import { createApartment } from '../../store/apartment/apartmentSlice';
import paths from '../../utils/paths';
import './CreateApartmentForm.scss';

export const CreateApartmentForm = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const { address } = useSelector((state) => state.apartment);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [square, setSquare] = useState();
  const [room, setRoom] = useState();
  const [bathroom, setBathroom] = useState();
  const [parkingSpace, setParkingSpace] = useState();
  const [yearBuilt, setYearBuilt] = useState();
  const [metro, setMetro] = useState();
  const [floor, setFloor] = useState();
  const [location, setLocation] = useState();
  const [rentalPeriod, setRentalPeriod] = useState();
  const [files, setFiles] = useState([]);
  const [count, setCount] = useState(0);
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const editDescription = (comment) => {
    setDescription(comment);
    setCount(comment.length);
  };

  const API_KEY = process.env.REACT_APP_API_KEY;
  const libraries = ['places'];
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    version: 'weekly',
    libraries,
    url: 'https://maps.googleapis.com/maps/api/js',
  });

  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    if (
      !title ||
      !address ||
      !description ||
      !price ||
      !square ||
      !room ||
      !bathroom ||
      !parkingSpace ||
      !yearBuilt ||
      !floor ||
      !location ||
      !rentalPeriod
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    title,
    address,
    description,
    price,
    square,
    room,
    bathroom,
    parkingSpace,
    yearBuilt,
    metro,
    floor,
    location,
    rentalPeriod,
  ]);

  useEffect(() => {
    if (!user) {
      navigate(paths.home);
    }
  }, [user]);

  const createFormApartment = () => {
    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('name', title);
    formData.append('price', price);
    formData.append('square', square);
    formData.append('leavingRoom', room);
    formData.append('metro', metro);
    formData.append('yearBuilt', yearBuilt);
    formData.append('parkingSpace', parkingSpace);
    formData.append('bathroom', bathroom);
    formData.append('address', address);
    formData.append('rentalPeriod', rentalPeriod);
    formData.append('description', description);
    formData.append('floor', floor);
    formData.append('location', location);
    formData.append('ownerName', user.firstName);
    formData.append('ownerPhone', user.phone);
    formData.append('ownerImage', user.img);
    files.forEach((file) => formData.append('image', file));

    dispatch(createApartment(formData)).then((res) => {
      if (!res.error) {
        navigate(paths.personalObjects);
      }
    });
  };

  if (loadError || !isLoaded || !window.google) {
    return <Spinner />;
  }

  return (
    <div className="create-apartment-container">
      <Button
        onClick={() => {
          navigate(-1);
        }}
        type="orange"
      >
        {'< Back'}
      </Button>
      <h4>Create an ad</h4>
      <form className="">
        <Input
          type="text"
          placeholder="Enter title"
          text="Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="create-apartment-photo">
          <FileUpload
            files={files}
            setFiles={setFiles}
            removeFile={removeFile}
            multiple="multiple"
          />
        </div>
        <div className="create-apartment-description">
          <h4>Description</h4>
          <textarea
            className="textarea"
            type="text"
            placeholder="Enter description"
            onChange={(e) => {
              editDescription(e.target.value);
            }}
          />
          <div className="symbol-counter">
            {count}
            /2500
          </div>
        </div>
        <h4>Details</h4>
        <div className="create-apartment-details">
          <Input
            size="s"
            type="text"
            placeholder=""
            text="Price, $"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <Input
            size="s"
            type="text"
            placeholder=""
            text="Square"
            onChange={(e) => {
              setSquare(e.target.value);
            }}
          />
          <div className="container">
            <h5>Room</h5>
            <Dropdown
              selected={room}
              setSelected={setRoom}
              options={['1', '2', '3', '4']}
            />
          </div>
          <Input
            size="s"
            type="text"
            placeholder=""
            text="Metro"
            onChange={(e) => {
              setMetro(e.target.value);
            }}
          />
          <div className="container">
            <h5>Bathroom</h5>
            <Dropdown
              selected={bathroom}
              setSelected={setBathroom}
              options={['1', '2', '3']}
            />
          </div>
          <div className="container">
            <h5>Parking space</h5>
            <Dropdown
              selected={parkingSpace}
              setSelected={setParkingSpace}
              options={['yes', 'no']}
            />
          </div>
          <Input
            size="s"
            type="number"
            min="1900"
            max="2040"
            step="1"
            placeholder=""
            text="Year built"
            onChange={(e) => {
              setYearBuilt(e.target.value);
            }}
          />
          <Input
            size="s"
            type="number"
            placeholder=""
            text="Floor"
            onChange={(e) => {
              setFloor(e.target.value);
            }}
          />
          <div className="container">
            <h5>Rental period</h5>
            <Dropdown
              selected={rentalPeriod}
              setSelected={setRentalPeriod}
              options={['short-term', 'long-term']}
            />
          </div>
          <div className="container">
            <h5>City</h5>
            <Dropdown
              selected={location}
              setSelected={setLocation}
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
        <h4>Add address</h4>
        <Autocomplete isLoaded={isLoaded} placeholder={address}>
          <React.Fragment />
        </Autocomplete>
        <Button
          type="orange"
          onClick={createFormApartment}
          disabled={inputValid ? false : true}
          className={inputValid ? '' : 'disabled'}
        >
          Create
        </Button>
      </form>
    </div>
  );
};
