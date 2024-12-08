import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh', 
      overflow: 'hidden',
      backgroundColor: '#E5EAF4'
    }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        height: '100vh'
      }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
