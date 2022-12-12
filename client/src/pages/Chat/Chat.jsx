import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatActions } from '../../components/ChatActions/ChatActions';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ListArticleCards } from '../../components/ListArticleCards/ListArticleCards';
import { PropertyBlock } from '../../components/PropertyBlock';
import { getArticle } from '../../store/chat/chatArticleSlice';
import { selectState, selectUser } from '../../store/user/userSlice';
import './Chat.scss';

const socket = io.connect(process.env.REACT_APP_API_URL);

export const Chat = () => {
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const articles = useSelector((state) => state.chat.article);

  useEffect(() => {
    socket.on('receive_message', () => dispatch(getArticle(chatId)));
    dispatch(getArticle(chatId));
  }, [socket]);

  useEffect(() => {
    socket.emit('join_room', chatId);
    dispatch(getArticle(chatId));
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <PropertyBlock title={chatId} />
      <div className="chat-content">
        <ChatActions socket={socket} location={chatId} />
        <ListArticleCards articles={articles} />
      </div>
      <Footer />
    </div>
  );
};
