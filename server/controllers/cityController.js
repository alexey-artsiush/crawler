const {City} = require('../models/index')
const ApiError = require('../error/apiError')
const uuid = require('uuid')
const path = require('path')

class CityController {
  async create(req, res, next) {

    try {
      const {city} = req.body
      const {img} = req.files
      let fileName = uuid.v4() + '.jpg'
      img.mv(path.resolve(__dirname, '..', 'static', fileName))

      const location = await City.create({city, img: fileName})
      return res.json({message: 'Success'})
    } catch (e) {
      next(ApiError.badRequest(e.message)) 
    }
  }

  async getAll (req, res) {
    const city = await City.findAll({});
    return res.json(city); 
  }
}

module.exports = new CityController()