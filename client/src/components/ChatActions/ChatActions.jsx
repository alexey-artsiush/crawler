import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, getArticle } from '../../store/chat/chatArticleSlice';
import { Dropdown } from '../Dropdown';
import { selectUser } from '../../store/user/userSlice';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';
import './ChatActions.scss';

export const ChatActions = ({ location, socket }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [filter, setFilter] = useState('all');
  const [askQuestionModal, setAskQuestionModal] = useState(false);
  const [giveAdviceModal, setGiveAdviceModal] = useState(false);
  const [titleAdvice, setTitleAdvice] = useState('');
  const [descriptionAdvice, setDescriptionAdvice] = useState('');
  const [titleQuestion, setTitleQuestion] = useState('');
  const [descriptionQuestion, setDescriptionQuestion] = useState('');

  const submitQuestion = async () => {
    try {
      const data = {
        title: titleAdvice,
        description: descriptionAdvice,
        author: user.id,
        location,
        type: 'question',
      };
      await socket.emit('send_message', data);
      await dispatch(createArticle(data));
      await dispatch(getArticle());
      setAskQuestionModal(false);
      setTitleQuestion('');
      setDescriptionQuestion('');
    } catch (e) {
      console.log(e);
    }
  };

  const submitAdvice = async () => {
    try {
      const data = {
        title: titleQuestion,
        description: descriptionQuestion,
        author: user.id,
        location,
        type: 'advice',
      };
      await socket.emit('send_message', data);
      await dispatch(createArticle(data));
      await dispatch(getArticle());
      setGiveAdviceModal(false);
      setTitleAdvice('');
      setDescriptionAdvice('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="chat-actions">
      <div className="chat-actions__buttons">
        <Button
          size="l"
          type="orange"
          onClick={() => setAskQuestionModal(true)}
        >
          Ask a question
        </Button>
        <Button size="l" type="orange" onClick={() => setGiveAdviceModal(true)}>
          Give advice
        </Button>
      </div>

      <div className="chat-actions__buttons">
        <Input type="text" placeholder="" text="Search" />
        <div className="chat-actions__wrapper">
          <h5>Filter</h5>
          <Dropdown
            size="l"
            selected={filter}
            setSelected={setFilter}
            options={['question', 'advice', 'all']}
          />
        </div>
      </div>

      <Modal active={askQuestionModal} setActive={setAskQuestionModal}>
        <div className="modal-container">
          <h4>New question</h4>
          <form>
            <Input
              placeholder="Enter question"
              value={titleQuestion}
              onChange={(e) => setTitleQuestion(e.target.value)}
            />
            <div className="container">
              <textarea
                className="input-description"
                placeholder="Enter description"
                value={descriptionQuestion}
                onChange={(e) => setDescriptionQuestion(e.target.value)}
              />
            </div>
          </form>

          <div className="modal-button">
            <Button size="m" type="orange" onClick={submitQuestion}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>

      <Modal active={giveAdviceModal} setActive={setGiveAdviceModal}>
        <div className="modal-container">
          <h4>New advice</h4>

          <form>
            <Input
              placeholder="Enter title"
              value={titleAdvice}
              onChange={(e) => setTitleAdvice(e.target.value)}
            />
            <div className="container">
              <textarea
                className="input-description"
                placeholder="Enter description"
                value={descriptionAdvice}
                onChange={(e) => setDescriptionAdvice(e.target.value)}
              />
            </div>
          </form>

          <div className="modal-button">
            <Button size="m" type="orange" onClick={submitAdvice}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
