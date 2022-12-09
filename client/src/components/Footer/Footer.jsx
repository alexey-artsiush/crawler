import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import paths from '../../utils/paths';
import './Footer.scss';

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <div className="footer-logo">
        <img
          src={logo}
          aria-hidden="true"
          onClick={() => {
            navigate(paths.home);
          }}
          alt="logo Crawler"
        />
      </div>
      <div className="footer-column">
        <div className="footer-column-header">
          <h4>Find your home here</h4>
        </div>
        <p className="footer-description">
          Service for communication between landlord and tenant
        </p>
      </div>

      <div className="footer-column">
        <div className="footer-column-header">
          <h4>Support</h4>
        </div>
        <p className="footer-description">
          <a href="/home">Customer services</a>
        </p>
        <p className="footer-description">
          <a href="/home">Email us</a>
        </p>
        <p className="footer-description">
          <a href="/home">Privacy policy</a>
        </p>
      </div>

      <div className="footer-column footer-media">
        <div className="footer-column-header">
          <h4>Social media</h4>
        </div>
        <p className="footer-description">
          <a href="/home">Facebook</a>
        </p>
        <p className="footer-description">
          <a href="/home">Instagram</a>
        </p>
        <p className="footer-description">
          <a href="/home">Twitter</a>
        </p>
      </div>
    </div>
  );
};
