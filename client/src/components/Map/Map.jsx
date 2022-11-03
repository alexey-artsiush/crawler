import React, { useCallback, useRef } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import defaultTheme from './Theme';
import './Map.scss';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableControl: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

export const Map = ({ center }) => {
  const mapRef = useRef(undefined);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = undefined;
  }, []);

  return (
    <div className="map-wrapper">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
};
