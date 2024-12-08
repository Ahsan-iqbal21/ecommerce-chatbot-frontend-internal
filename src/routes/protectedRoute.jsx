import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import { Box, CircularProgress } from '@mui/material';
import { isTokenExpired } from '../utils/helperFunctions';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );

  if (!user || isTokenExpired(user?.token)) return <Navigate to="/" replace />;

  return children;
};
