import React, { useEffect } from 'react';
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

export const Chat = () => {
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { chatId } = useParams();
  const articles = useSelector((state) => state.chat.article);

  useEffect(() => {
    dispatch(getArticle(chatId));
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <PropertyBlock title={chatId} />
      <div className="chat-content">
        <ChatActions location={chatId} />
        <ListArticleCards articles={articles} />
      </div>
      <Footer />
    </div>
  );
};
