const { Article, Comment } = require('../models/index');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');
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
      let { location, type } = req.query;

      const articles = await Article.findAndCountAll({
        where: {
          type: {
            [Op.or]: !type ? [] : [type],
          },
          location: {
            [Op.or]: !location ? [] : [location],
          },
        },
        order: [['createdAt', 'DESC']],
        include: { model: Comment },
      });
      return res.json(articles);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController();
