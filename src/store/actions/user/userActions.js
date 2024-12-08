import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR
} from '../../actionTypes/user/userActionTypes';
import UserService from '../../../services/loginService'; 
import StorageHelper from '../../../utils/StorageHelper';
import ApiBaseHelper from '../../../network/apiBaseHelper';

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await UserService.login(credentials.email, credentials.password);
        const userData = response.data;
        
        StorageHelper.setItem('userProfile', userData);
        
        ApiBaseHelper.updateAuthToken(userData.token);
        
        dispatch({ type: LOGIN_SUCCESS, payload: userData });
        return userData;
      } catch (error) {
        dispatch({ type: LOGIN_ERROR, payload: error.response.data.message});
        throw error;
      }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    console.error('Logout failed', error);
  }
};
