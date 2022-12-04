/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { authHost, host } from './index';

const getApartment = async (filter) => {
  const {
    leavingRoom,
    city: location,
    rentalPeriod,
    minPrice,
    maxPrice,
  } = filter;
  const apartment = await host.get('/api/apartment', {
    params: {
      leavingRoom,
      location,
      rentalPeriod,
      minPrice,
      maxPrice,
    },
  });
  return apartment.data;
};

const getApartmentByUserId = async (userId) => {
  const apartment = await host.get('/api/apartment', {
    params: {
      userId,
    },
  });
  return apartment.data;
};

const getOneApartment = async (id) => {
  const { data, status } = await host.get(`/api/apartment/${id}`);
  if (status === 200) {
    const files = [];
    for (let i = 0; i < data.photos.length; i++) {
      const file = await fetch(
        `${process.env.REACT_APP_API_URL}/${data.photos[i].img}`
      )
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            new File([blobFile], data.photos[i].img, {
              type: 'image/jpeg',
            })
        );
      files.push(file);
    }
    return {
      ...data,
      files,
    };
    // eslint-disable-next-line no-else-return
  } else return data;
};

const createApartment = async (apartmentData) => {
  const apartment = await authHost.post('/api/apartment', apartmentData);
  return apartment.data;
};

const updateApartment = async (apartmentData) => {
  const apartment = await host.put(
    '/api/apartment/update-apartment',
    apartmentData
  );
  return apartment.data;
};

const getPremiumApartment = async () => {
  const apartment = await host.get('/api/apartment', {
    params: {
      premium: true,
    },
  });
  return apartment.data;
};

const changePremiumStatus = async (id, premium) => {
  const status = await authHost.put('/api/apartment/change-premium', {
    id,
    premium,
  });
  return status;
};

const apartmentService = {
  getApartment,
  getOneApartment,
  createApartment,
  updateApartment,
  getApartmentByUserId,
  changePremiumStatus,
  getPremiumApartment,
};

export default apartmentService;
