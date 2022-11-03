/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

const onClick = jest.fn();

describe('Button component', () => {
  it('Renders Button component', () => {
    render(
      <Button>Text</Button>
    );
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  it('Renders without text', () => {
    render(
      <Button />
    );
    expect(screen.queryByText(/text/i)).toBeNull();
  });
  it('onClick works', () => {
    render(
      <Button onClick={onClick}>Press me</Button>
    );
    userEvent.click(screen.getByText('Press me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
