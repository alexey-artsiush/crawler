const { Comment } = require('../models/index');
const ApiError = require('../error/apiError');
const { Op } = require('sequelize');
const uuid = require('uuid');
const path = require('path');

class ArticleController {
  async create(req, res, next) {
    try {
      const { userId, text, articleId, location } = req.body;

      await Comment.create({ userId, text, articleId, location });

      return res.json({ message: 'Comment created successfully ' });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      let { location, type } = req.query;

      const comments = await Article.findAndCountAll({
        where: {
          type: {
            [Op.or]: !type ? [] : [type],
          },
          location: {
            [Op.or]: !location ? [] : [location],
          },
        },
        order: [['createdAt', 'DESC']],
        include: { model: Comment, User },
      });
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController();
