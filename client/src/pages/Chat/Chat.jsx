import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatActions } from '../../components/ChatActions/ChatActions';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ListArticleCards } from '../../components/ListArticleCards/ListArticleCards';
import { PropertyBlock } from '../../components/PropertyBlock';
import { selectState, selectUser } from '../../store/user/userSlice';
import './Chat.scss';

export const Chat = () => {
  const isAuth = useSelector(selectState);
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  const { chatId } = useParams();

  useEffect(() => {
    // dispatch();
  }, []);

  return (
    <div>
      <Header isAuth={isAuth} user={user} />
      <PropertyBlock title={chatId} />
      <div className="chat-content">
        <ChatActions />
        <ListArticleCards />
      </div>
      <Footer />
    </div>
  );
};
