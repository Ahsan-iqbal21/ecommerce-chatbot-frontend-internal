import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../../store/actions/user/userActions';
import { useUser } from '../../contexts/userContext';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { error } = useSelector((state) => state.user);
    const { setUser } = useUser();
  
    const handleLogin = async (data) => {
      setLoading(true);
      try {
        const userData = await dispatch(loginUser(data));
        if (userData) {
            console.log("userdata: ", userData)
            setUser(userData);
            navigate('/chat');
        }
      } catch (error) {
        console.error('Login failed', error);
      } finally {
        setLoading(false);
      }
    };
  
    return {
      handleLogin,
      loading,
      error
    };
  };
  

export default useLogin;
