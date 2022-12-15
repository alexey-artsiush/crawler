/* eslint-disable object-curly-newline */
import { host } from './index';

const getArticle = async (location) => {
  const article = await host.get('/api/chat-article', { params: { location } });
  return article.data;
};

const createArticle = async (formData) => {
  const { data } = await host.post('/api/chat-article', formData);
  return data;
};

const sendComment = async (commentData) => {
  const { data } = await host.post('/api/chat-article', commentData);
  return data;
};

const chatService = {
  getArticle,
  createArticle,
  sendComment,
};

export default chatService;
