const { News } = require('../models/index');
const ApiError = require('../error/apiError');
const uuid = require('uuid');
const path = require('path');

class NewsController {
  async create(req, res, next) {
    try {
      const { title, description } = req.body;

      let files = req.files.image;

      if (!Array.isArray(files)) {
        files = [files];
      }

      for (let i = 0; i < files.length; i++) {
        const splitName = files[i].name.split('.');
        const fileType = splitName[splitName.length - 1];
        let fileName = uuid.v4() + `.${fileType}`;
        files[i].mv(path.resolve(__dirname, '..', 'static', fileName));

        await News.create({
          title,
          description,
          img: fileName,
        });
      }
      return res.json({ message: 'Success' });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const news = await News.findAll({
        order: [['updatedAt', 'DESC']],
      });
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const news = await News.findOne({
      where: { id },
    });
    return res.json(news);
  }
}

module.exports = new NewsController();
