import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import ApiBaseHelper from '../network/apiBaseHelper';
import StorageHelper from '../utils/StorageHelper'; 
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser as logoutReduxAction } from '../store/actions/user/userActions';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = useCallback(async () => {
    StorageHelper.removeItem('userProfile'); 
    ApiBaseHelper.updateAuthToken(null);
    if (window.logoutTimer) clearTimeout(window.logoutTimer); 
    setUser(null);
    dispatch(logoutReduxAction()); 
    dispatch({ type: 'RESET_STATE' });
    navigate('/');
  }, [dispatch, navigate]);

  const scheduleAutoLogout = useCallback(
    (token) => {
      const { exp } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const delay = (exp - currentTime) * 1000;

      if (window.logoutTimer) clearTimeout(window.logoutTimer);
      window.logoutTimer = setTimeout(() => logoutUser(), delay);
    },
    [logoutUser]
  );

  const handleSetUser = useCallback(
    (userData) => {
      setUser(userData);
      StorageHelper.setItem('userProfile', userData);
      ApiBaseHelper.updateAuthToken(userData.token);
      scheduleAutoLogout(userData.token);
    },
    [scheduleAutoLogout]
  );

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedUser = StorageHelper.getItem('userProfile');
      if (storedUser && storedUser.token && !(jwtDecode(storedUser.token).exp < Date.now() / 1000)) {
        setUser(storedUser);
        ApiBaseHelper.updateAuthToken(storedUser.token);
        scheduleAutoLogout(storedUser.token);
      }
      setLoading(false); 
    };

    loadUserFromStorage(); 

    return () => {
      if (window.logoutTimer) clearTimeout(window.logoutTimer);
    };
  }, [scheduleAutoLogout]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
        loading,
        logoutUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
