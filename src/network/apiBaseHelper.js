import axios from 'axios';
import ApiLinks from './apiLinks';

const HARDCODED_USER_ID = '123e4567-e89b-12d3-a456-426614174002';

class ApiBaseHelper {
  static axiosInstance = axios.create({
    baseURL: ApiLinks.API_BASE_URL
  });

  static updateAuthToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  static async get(url) {
    const response = await this.axiosInstance.get(url, {
      headers: {
        'x-user-id': HARDCODED_USER_ID,
      },
    });
    return response.data;
  }

  static async post(url, data) {
    const response = await this.axiosInstance.post(url, data, {
      headers: {
        'x-user-id': HARDCODED_USER_ID,
      },
    });
    return response.data;
  }

  static async patch(url, data) {
    const response = await this.axiosInstance.patch(url, data, {
      headers: {
        'x-user-id': HARDCODED_USER_ID,
      },
    });
    return response.data;
  }

  static async put(url, data) {
    const response = await this.axiosInstance.put(url, data, {
      headers: {
        'x-user-id': HARDCODED_USER_ID,
      },
    });
    return response.data;
  }

  static async delete(url) {
    await this.axiosInstance.delete(url,  {
      headers: {
        'x-user-id': HARDCODED_USER_ID,
      },
    });
  }
}

export default ApiBaseHelper;
