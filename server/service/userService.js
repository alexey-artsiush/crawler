const ApiError = require('../error/apiError')
const {User} = require('../models/index')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService');
const tokenService = require('./tokenService');

class UserService {
  async activate(activationLink) {
    const user = await User.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('Invalid registration link')
    }
    user.isActivated = true;
    await user.save();
  }

    async login(email, password) {
      const user = await User.findOne({email})
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!user || !isPassEquals) {
        throw ApiError.BadRequest('Invalid email or password')
      }
        
      const tokens = tokenService.generateTokens({...user});

      await tokenService.saveToken(user.id, tokens.refreshToken);
      return {...tokens, user}
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
      const user = await User.findById(userData.id);
      const tokens = tokenService.generateTokens({...user});

      await tokenService.saveToken(user.id, tokens.refreshToken);
      return {...tokens, user}
    }

    async getAllUsers() {
      const users = await User.findAll();
      return users;
    }

}

module.exports = new UserService();
