const { Article } = require('../models/index');
const ApiError = require('../error/apiError');
const uuid = require('uuid');
const path = require('path');

class ArticleController {
  async create(req, res, next) {
    try {
      const { title, description, author, location, type } = req.body;

      await Article.create({
        title,
        description,
        author,
        location,
        type,
      });

      return res.json({ message: 'Article created successfully ' });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      let { location } = req.query;

      const articles = await Article.findAndCountAll({
        // where: {
        //   location: {
        //     [Op.or]: !location ? [] : [location],
        //   },
        // },
        order: [['createdAt', 'DESC']],
      });
      return res.json(articles);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController();
