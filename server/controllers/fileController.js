const ApiError = require('../error/apiError');
const fs = require('fs');
const { Photo } = require('../models');
const { log } = require('console');
const path = require('path')

class FileController {
  async downloadFile(req, res, next) {
    try {
      const {img} = req.query
      const file = await Photo.findOne({img})
      const route = `${__dirname}/static/fe3d5033-016b-43cb-b7c3-8510ebc75e79.jpg`;
      return res.attachment(route).send();
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
}

module.exports = new FileController()
