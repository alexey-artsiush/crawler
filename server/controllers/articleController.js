const { Article } = require('../models/index');
const ApiError = require('../error/apiError');
const uuid = require('uuid');
const path = require('path');

class ArticleController {
  async create(req, res, next) {
    try {
      const { userId, location, title, description, userName, userImage } =
        req.body;

      await Article.create({
        userId,
        location,
        title,
        description,
        userName,
        userImage,
      });

      return res.json({ message: 'Article created successfully ' });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const articles = await Article.findAll();
      return res.json(articles);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ArticleController();
