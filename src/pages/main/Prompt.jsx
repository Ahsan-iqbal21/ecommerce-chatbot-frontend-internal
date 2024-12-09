import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress, IconButton } from '@mui/material';
import ArrowIcon from '../../assets/Arrow.svg';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import useGetPrompt from '../../hooks/prompt/useGetPrompt';
import useUpdatePrompt from '../../hooks/prompt/useUpdatePrompt';
import SuccessToaster from '../../components/SuccessToaster'; 

const Prompt = () => {
  const { prompt, getPrompt } = useGetPrompt();
  const { updatePrompt, loading, error } = useUpdatePrompt();
  const [promptText, setPromptText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      const fetchedPrompt = await getPrompt();
      if (fetchedPrompt) {
        setPromptText(fetchedPrompt);
      }
    };

    fetchPrompt();
  }, []);

  const handleUpdate = async () => {
    const success = await updatePrompt(promptText);
    if (success) {
      setSuccessMessage('Prompt updated successfully!');
      setIsEditMode(false);
    }
  };

  const handleToggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNavigateToAdd = () => {
    navigate('/documents/add');
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(''); 
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Box sx={{padding: '0 35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 4}}>
            <img
            src={ArrowIcon}
            onClick={handleNavigateToAdd}
            alt="arrow icon"
            style={{ marginRight: '15px', cursor: 'pointer' }}
            />
            <Typography variant="h4">Prompt</Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', gap: '5px', mt: 2}}>
            <IconButton
                onClick={isEditMode ? handleUpdate : handleToggleMode}
                sx={{
                    backgroundColor: isEditMode ? 'primary.main' : 'secondary.main',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px',
                    width: '85px',
                    height: '40px',
                    borderRadius: '25px',
                    '&:hover': {
                    backgroundColor: isEditMode ? 'primary.dark' : 'secondary.dark',
                    },
                }}
            >
            {isEditMode ? <SaveIcon /> : <EditIcon />}
            <Typography sx={{ color: '#fff' }}>
                {isEditMode ? 'Save' : 'Edit'}
            </Typography>
            </IconButton>

            {isEditMode && (
                <IconButton
                    onClick={handleToggleMode}
                    sx={{
                    backgroundColor: 'error.main',
                    width: '85px',
                    height: '40px',
                    borderRadius: '25px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px',
                    gap: '5px',
                    '&:hover': {
                        backgroundColor: 'error.dark',
                    },
                    }}
                >
                    <CancelIcon />
                    <Typography sx={{ color: '#fff',}}>
                    Cancel
                    </Typography>
                </IconButton>
            )}
        </Box>
      </Box>

      <Box
        sx={{
          padding: '35px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {isEditMode ? (
          <TextField
            multiline
            fullWidth
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            variant="outlined"
            sx={{
              width: '100%',
              height: '73vh',
              backgroundColor: '#F9F9F9',
              borderRadius: '18px',
              overflow: 'auto',
              padding: '25px',
              color: '#6b6666',
              '& .MuiOutlinedInput-root': {
                height: '100%',
                alignItems: 'flex-start',
                backgroundColor: '#F9F9F9',
                padding: '0',
                color: '#6b6666',
              },
              '& .MuiOutlinedInput-input': {
                padding: '0',
                margin: '0',
                backgroundColor: '#F9F9F9',
                color: '#6b6666',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                color: '#6b6666',
              },
            }}
          />
        ) : (
          <Typography
            variant="body1"
            sx={{
              width: '100%',
              height: '73vh',
              backgroundColor: '#F9F9F9',
              color: '#6b6666',
              borderRadius: '18px',
              overflowY: 'auto',
              padding: '25px',
              fontSize: '14px',
              textAlign: 'left',
              whiteSpace: 'pre-wrap', 
            }}
          >
            {promptText || 'No prompt available.'}
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ width: '100%', marginTop: '20px' }}>
            {error}
          </Typography>
        )}

        <SuccessToaster
          open={Boolean(successMessage)}
          onClose={handleCloseSuccessMessage}
          message={successMessage} 
        />
      </Box>
    </Box>
  );
};

export default Prompt;
