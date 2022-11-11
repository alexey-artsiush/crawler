import { authHost, host } from '.';

const getNews = async () => {
  const news = await host.get(`${process.env.REACT_APP_API_URL}/api/news`);
  return news.data;
};

const getOneNews = async (id) => {
  const news = await host.get(
    `${process.env.REACT_APP_API_URL}/api/news/:${id}`
  );
  return news.data;
};

const createNews = async (newsData) => {
  const news = await authHost.post(
    `${process.env.REACT_APP_API_URL}/api/news`,
    newsData
  );
  return news.data;
};

const newsService = {
  getNews,
  getOneNews,
  createNews,
};

export default newsService;
