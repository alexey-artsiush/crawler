/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import { TopApartmentCard } from '../TopApartmentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Bestseller.scss';

export const Bestseller = ({ topApartment }) => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
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
  return (
    <div className="select-city">
      <div className="city-header">
        <h2>Homes guests love</h2>
      </div>
      <div className="chat-content">
        <div className="">
          <Slider {...settings}>
            {topApartment
              ? topApartment.map((apartment) => {
                  return (
                    <TopApartmentCard
                      apartment={apartment}
                      key={apartment.id}
                    />
                  );
                })
              : null}
          </Slider>
        </div>
      </div>
    </div>
  );
};
