/* eslint-disable object-curly-newline */
import { host } from './index';

const getCity = async () => {
  const city = await host.get('/api/city', {});
  return city.data;
};

const cityService = {
  getCity,
};

export default cityService;
