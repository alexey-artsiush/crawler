/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useJsApiLoader } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Button } from '../../components/Button';
import { Spinner } from '../../components/Spinner';
import { DetailCard } from '../../components/DetailCard';
import { Header } from '../../components/Header';
import { Cover } from '../../components/Cover';
import { Footer } from '../../components/Footer';
import {
  getApartmentById,
  selectCurrentApartment,
} from '../../store/apartment/apartmentSlice';
import { Map } from '../../components/Map';
import { selectState, selectUser } from '../../store/user/userSlice';
import { OwnerCard } from '../../components/OwnerCard';
import './Apartment.scss';

export const Apartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const apartment = useSelector(selectCurrentApartment);

  const defaultCenter = {
    lat: 53.9068491,
    lng: 27.5544621,
  };
  const API_KEY = process.env.REACT_APP_API_KEY;
  const libraries = ['places'];
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    version: 'weekly',
    libraries,
    url: 'https://maps.googleapis.com/maps/api/js',
  });

  const getGeo = () => {
    getGeocode({
      address: `${apartment?.location} ${apartment?.address}`,
    }).then((results) => {
      const { lat, lng } = getLatLng(results[0]);
      setCenter({
        lat,
        lng,
      });
    });
  };

  useEffect(() => {
    dispatch(getApartmentById(id));
    if (window.google) {
      getGeo();
    }
  }, [window.google, id]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loadError || !apartment) {
    return <Spinner />;
  }

  return (
    <div className="apartment-wrapper">
      <Header isAuth={isAuth} user={user} />
      <div className="apartment">
        <Button
          onClick={() => {
            navigate(-1);
          }}
          type="orange"
        >
          {'< Back'}
        </Button>
        <Slider {...settings}>
          {apartment
            ? apartment.photos.map((image) => (
                <Cover key={image.img} size="m" image={image.img} />
              ))
            : null}
        </Slider>

        <h4>Description</h4>
        <span className="apartment-text">{apartment.description}</span>

        <h4>Details</h4>
        <div className="apartment-details">
          <DetailCard title="Apartment ID" value={apartment.id} />
          <DetailCard title="Price" value={`${apartment.price} $`} />
          <DetailCard title="Square" value={apartment.square} />
          <DetailCard title="Room" value={apartment.leavingRoom} />
          <DetailCard title="Metro" value={apartment.metro} />
          <DetailCard title="Floor" value={apartment.floor} />
          <DetailCard title="Year built" value={apartment.yearBuilt} />
          <DetailCard
            title="Address"
            value={`${apartment?.location}, ${apartment?.address}`}
          />
          <DetailCard title="Rental period" value={apartment.rentalPeriod} />
        </div>

        <h4>Address</h4>
        <div className="apartment-location">
          <span className="apartment-location-address">
            {`${apartment?.location},  ${apartment?.address}`}
          </span>
        </div>
        {isLoaded ? <Map center={center} /> : <Spinner />}
        <div className="apartment-contact">
          <h4>Contact info</h4>
          <OwnerCard
            ownerImage={apartment.ownerImage}
            ownerPhone={apartment.ownerPhone}
            ownerName={apartment.ownerName}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Apartment;
