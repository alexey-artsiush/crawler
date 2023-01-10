/* eslint-disable object-curly-newline */
import { host } from './index';

const getArticle = async (location) => {
  const article = await host.get('/api/chat-article', { params: { location } });
  return article.data;
};

const createArticle = async (data) => {
  const { response } = await host.post('/api/chat-article', data);
  return response;
};

const sendComment = async (commentData) => {
  const { data } = await host.post('/api/comment', commentData);
  return data;
};

const chatService = {
  getArticle,
  createArticle,
  sendComment,
};

export default chatService;
