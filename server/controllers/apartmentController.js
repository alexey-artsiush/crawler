const { Apartment, Photo } = require('../models/index');
const ApiError = require('../exceptions/apiError');
const fs = require('fs');
const { Op } = require('sequelize');
const uuid = require('uuid');
const path = require('path');

class ApartmentController {
  async create(req, res, next) {
    try {
      const {
        userId,
        name,
        price,
        square,
        leavingRoom,
        metro,
        parkingSpace,
        yearBuilt,
        bathroom,
        address,
        rentalPeriod,
        description,
        floor,
        location,
        type,
        ownerName,
        ownerPhone,
        ownerImage,
      } = req.body;

      let files = req.files.image;

      if (!Array.isArray(files)) {
        files = [files];
      }

      const apartment = await Apartment.create({
        userId,
        name,
        price,
        square,
        leavingRoom,
        metro,
        parkingSpace,
        yearBuilt,
        bathroom,
        address,
        rentalPeriod,
        description,
        floor,
        location,
        type,
        ownerName,
        ownerPhone,
        ownerImage,
        premium: false,
      });

      for (let i = 0; i < files.length; i++) {
        const splitName = files[i].name.split('.');
        const fileType = splitName[splitName.length - 1];
        let fileName = uuid.v4() + `.${fileType}`;
        files[i].mv(path.resolve(__dirname, '..', 'static', fileName));

        await Photo.create({
          apartmentId: apartment.id,
          img: fileName,
        });
      }
      return res.json({ mesage: 'Success create apartment' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let {
        page,
        limit,
        location,
        leavingRoom,
        rentalPeriod,
        userId,
        premium,
      } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 10;
      let offset = page * limit - limit;
      const filter = {};

      for (let key in req.query) {
        if (key !== 'page' && key !== 'limit') filter[key] = req.query[key];
      }

      const apartments = await Apartment.findAndCountAll({
        where: {
          location: { [Op.or]: location ? [location] : [] },
          leavingRoom: { [Op.or]: leavingRoom ? [leavingRoom] : [] },
          rentalPeriod: { [Op.or]: rentalPeriod ? [rentalPeriod] : [] },
          // price: {
          //   [Op.between]: !minPrice || !maxPrice ? [] : [minPrice, maxPrice],
          // },
          userId: { [Op.or]: userId ? [userId] : [] },
          premium: { [Op.or]: !!premium ? [!!premium] : [] },
        },
        limit,
        offset,
        include: { model: Photo },
        distinct: true,
        order: [['premium', 'DESC']],
      });

      return res.json({ apartments });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const apartment = await Apartment.findOne({
      where: { id },
      include: { model: Photo },
    });
    return res.json(apartment);
  }

  async changePremiumStatus(req, res, next) {
    try {
      const { id, premium } = req.body;
      const apartment = await Apartment.update(
        { premium },
        {
          where: {
            id,
          },
        }
      );

      return res.json({ message: 'Success changes' });
    } catch (e) {
      next(e);
    }
  }

  async updateApartment(req, res, next) {
    try {
      const {
        id,
        name,
        price,
        square,
        leavingRoom,
        metro,
        parkingSpace,
        yearBuilt,
        bathroom,
        address,
        rentalPeriod,
        description,
        floor,
        location,
        userId,
        premium,
        ownerName,
        ownerPhone,
        ownerImage,
      } = req.body;

      const apartment = await Apartment.update(
        {
          id,
          name,
          price,
          square,
          leavingRoom,
          metro,
          parkingSpace,
          yearBuilt,
          bathroom,
          address,
          rentalPeriod,
          description,
          floor,
          location,
          userId,
          premium,
          ownerName,
          ownerPhone,
          ownerImage,
        },
        { where: { id } }
      );

      return res.json({ mesage: 'Success' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body;
      const apartment = await Apartment.destroy({ where: { id } });
      const photos = await Photo.findAll({ where: { apartmentId: id } });

      for (let i = 0; i < photos.length; i++) {
        const path = path.resolve(
          __dirname,
          '..',
          'static',
          photos[i].imageName
        );
        fs.unlinkSync(path);
      }

      const photo = await Photo.destroy({ where: { apartmentId: id } });

      return res.json({ message: 'Data was deleted successfully' });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ApartmentController();
