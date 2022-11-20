import React from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import './ChatActions.scss';

export const ChatActions = () => {
  return (
    <div className="chat-actions">
      <div className="chat-actions__buttons">
        <Button size="l" type="orange">
          Asq a question
        </Button>
        <Button size="l" type="orange">
          Give advice
        </Button>
      </div>

      <div className="chat-actions__buttons">
        <Input type="text" placeholder="" text="Search" />
        <Input type="text" placeholder="" text="Filter" />
      </div>
    </div>
  );
};
