/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Filter } from './Filter';
import store from '../../store/index';

describe('Filter component tests', () => {
  it('Render brand phrase', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Filter />
        </Provider>
      </BrowserRouter>
    );
    const helloElement = screen.getByText(/Find you apartment here/i);
    expect(helloElement).toBeInTheDocument();
  });
  it('Filter component snapshot', () => {
    const filter = render(
      <BrowserRouter>
        <Provider store={store}>
          <Filter />
        </Provider>
      </BrowserRouter>
    );
    expect(filter).toMatchSnapshot();
  });
});
