import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';

class LoginService {
  static async login(email, password) {
    const response = await ApiBaseHelper.post(ApiLinks.LOGIN_URL, { email, password });
    return response;
  }
}

export default LoginService;