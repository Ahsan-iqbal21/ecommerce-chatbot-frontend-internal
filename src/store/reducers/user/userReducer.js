import { LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../../actionTypes/user/userActionTypes";

const initialState = {
    user: null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          user: action.payload,
          error: null
        };
      case LOGOUT_SUCCESS:
        return {
          ...state,
          user: null,
          error: null
        };
      case LOGIN_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  