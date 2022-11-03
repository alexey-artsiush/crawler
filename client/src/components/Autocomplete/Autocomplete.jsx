/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../store/apartment/apartmentSlice';
import './Autocomplete.scss';

export const Autocomplete = ({ isLoaded, placeholder }) => {
  const dispatch = useDispatch();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    dispatch(setAddress(e.target.value));
  };

  const handleSelect = ({ description }) =>
    () => {
      setValue(description, false);
      dispatch(setAddress(description));
      clearSuggestions();
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} aria-hidden onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong>
          <small>{secondary_text}</small>
        </li>
      );
    });

  useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <div className="autocomplete-wrapper" ref={ref}>
      <input
        type="text"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
      />
      {status === 'OK' && <ul className="suggestions">{renderSuggestions()}</ul>}
    </div>
  );
};
