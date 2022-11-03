/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

const onChange = jest.fn();

describe('Input component', () => {
  it('Renders Input component', () => {
    render(
      <Input text="Text" onChange={onChange} />
    );
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  it('Renders without text', () => {
    render(
      <Input onChange={onChange} />
    );
    expect(screen.queryByText(/text/i)).toBeNull();
  });
  it('Custom palceholder', () => {
    render(
      <Input placeholder="test placeholder" />
    );
    expect(screen.getByPlaceholderText(/test placeholder/)).toBeInTheDocument();
  });
  it('OnChange works', () => {
    render(
      <Input text="Text" onChange={onChange} />
    );
    userEvent.type(screen.getByRole('textbox'), 'test text');
    expect(onChange).toHaveBeenCalledTimes(9);
  });
});
