const ApiError = require('../exceptions/apiError')
const {User} = require('../models/index')
const {validationResult} = require('express-validator');
const userService = require('../service/userService');
const uuid = require('uuid')
const jwt = require('jsonwebtoken') 
const path = require('path')

const generateJwt =(id, email, firstName, lastName, role, city, sex, img, phone) => {
  return jwt.sign({id:id, email:email, firstName:firstName, lastName:lastName, role:role, city:city, sex:sex, img:img, phone:phone}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
  async registration(req, res, next) {
    try {
      const {firstName, lastName, email, city, sex, password, phone} = req.body
      const {img} = req.files
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()))
      }
      if (!firstName || !lastName || !email || !city || !sex || !password || !phone || !img) {
        return next(ApiError.badRequest('All inputs should be valid', errors.array()))
      }
      
      const userData = await userService.registration(firstName, lastName, email, city, sex, password, phone, img);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
 
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e)
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
        next(e);
    }
  }

  async update(req, res, next) {
    try {
      const {userId, firstName, lastName, email, role, city, sex, img, phone} = req.body
    const user = await User.update(
      {
        firstName: firstName,
        lastName,
        email,
        city,
        phone,
      }, {
        where: {
          id: userId,
        },
      })
    if (!user) {
        return next(ApiError.internal('Invalid user'))
    }
    const token = generateJwt(userId, firstName, lastName, email, role, city, sex, img, phone)
    return res.json({token})
   } catch (e) {
      next(e)
    }
  }
}

module.exports = new UserController()