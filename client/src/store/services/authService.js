import authHost from './index';

export default class AuthService {
  static async login(email, password) {
    return authHost.post('/login', {
      email,
      password,
    });
  }

  static async registration(email, password) {
    return authHost.post('/registration', {
      email,
      password,
    });
  }

  static async logout() {
    return authHost.post('/logout');
  }
}
