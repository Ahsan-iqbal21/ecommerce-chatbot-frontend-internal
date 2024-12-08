import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default LoginLayout;
