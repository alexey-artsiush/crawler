const ApiError = require('../error/apiError')
const {User} = require('../models/index')
const bcrypt = require('bcrypt')
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

  const user = await User.create({email, firstName, lastName, password: hashPassword, city, sex, img: fileName, role: "USER", phone}) 

  const token = generateJwt(user.id, user.email, user.firstName, user.lastName, user.role, user.city, user.sex, user.img, user.phone)
  return res.json({token})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
 
  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
        return next(ApiError.internal('Invalid email or password'))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Invalid password'))
    }
    const token = generateJwt(user.id, user.email, user.firstName, user.lastName, user.role, user.city, user.sex, user.img, user.phone)
    return res.json({token})
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.firstName, req.user.lastName, req.user.role, req.user.city, req.user.sex, req.user.img, req.user.phone)
    return res.json({token})
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
}

module.exports = new UserController()