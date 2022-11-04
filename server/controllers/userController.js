const ApiError = require('../error/apiError')
const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const userService = require('../service/userService');
const { validationResult } = require('express-validator');
const mailService = require('../service/mailService');
const tokenService = require('../service/tokenService');
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken') 

const generateJwt =(id, email, firstName, lastName, role, city, sex, img, phone) => {
  return jwt.sign({id:id, email:email, firstName:firstName, lastName:lastName, role:role, city:city, sex:sex, img:img, phone:phone}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
  async registration(req, res, next) {
    try {
      const {firstName, lastName, email, city, sex, password, phone} = req.body
    const {img} = req.files
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password'))
  }
  const candidate = await User.findOne({where: {email}})
  if (candidate) {
    return next(ApiError.badRequest('Email already exist'))
  }
  const hashPassword = await bcrypt.hash(password, 5)
  const activationLink = uuid.v4();
  await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);

  const user = await User.create({email, firstName, lastName, password: hashPassword, city, sex, img: fileName, role: "USER", phone, activationLink}) 

  const tokens = tokenService.generateTokens({...user});
  await tokenService.saveToken(user.id, tokens.refreshToken);

  res.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
  return res.json({...tokens, user})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
 
  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.json(userData);
    } catch (e) {
      next(e);
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
      const {refreshToken} = req.cookies;
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
      next(ApiError.badRequest(e.message))
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController()