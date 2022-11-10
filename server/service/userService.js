const ApiError = require('../exceptions/apiError')
const UserDto = require('../dtos/userDto');
const {User} = require('../models/index')
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const tokenService = require('./tokenService');
const mailService = require('./mailService');
const path = require('path')

class UserService {
  async registration(firstName, lastName, email, city, sex, password, phone, img) {
    const candidate = await User.findOne({where: {email}})
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`) 
    }
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
    const user = await User.create({email, firstName, lastName, password: hashPassword, city, sex, img: fileName, role: "USER", phone, activationLink})
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async activate(activationLink) {
    try {
      const user = await User.findOne({where: {activationLink}})
      if (!user) {
        throw ApiError.BadRequest('Invalid registration link')
      }
      user.isActivated = true;
      await user.save();
    } catch (e) {
      throw ApiError.BadRequest('Something went wrong', e)
    }
    
  }

    async login(email, password) {
      const user = await User.findOne({where: {email}})
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!user || !isPassEquals) {
        throw ApiError.BadRequest('Invalid email or password')
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});
      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);
      return token;
    }

    async refresh(refreshToken) {
      if (!refreshToken) {
        throw ApiError.UnauthorizedError();
      }
      const userData = tokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await tokenService.findToken(refreshToken);
      if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorizedError();
      }
      const user = await User.findOne({ where: { id: userData.id } });
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({...userDto});

      await tokenService.saveToken(userDto.id, tokens.refreshToken);
      return {...tokens, user: userDto}
    }

}

module.exports = new UserService();
