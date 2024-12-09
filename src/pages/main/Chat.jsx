import { Box, List, ListItem, Typography, TextField, Button, CircularProgress, Tooltip } from '@mui/material';
import ArrowIcon from '../../assets/Arrow.svg';
import { useNavigate } from 'react-router-dom';
import useGetChats from '../../hooks/chats/useGetChats';
import useCreateChat from '../../hooks/chats/useCreateChat';
import { useForm } from 'react-hook-form';
import CreateChatIcon from '../../assets/Create.svg';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/actions/chats/chatActions';
import CloseIcon from '@mui/icons-material/Close'; 
import useDeleteChat from '../../hooks/chats/useDeleteChat';
import SuccessToaster from '../../components/SuccessToaster';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const navigate = useNavigate();
  const { chats, chatHistory, selectedChatId, loading, handleSelectChat } = useGetChats();
  const { handleCreateChat, clearSelectedChat } = useCreateChat();
  const { handleDeleteChat, deletingChatId } = useDeleteChat(); 
  const { register, handleSubmit, reset, watch } = useForm(); 
  const [toasterOpen, setToasterOpen] = useState(false);
  const [streamedMessage, setStreamedMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);

  const sortedChats = chats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, streamedMessage]);

  const handleNavigateToAdd = () => {
    navigate('/documents/add');
  };

  const handleCreateNewChat = () => {
    clearSelectedChat();
  };

  const onSubmit = (data) => {
    setGenerating(true);
    const user = JSON.parse(localStorage.getItem('userProfile'));
    
    if (!selectedChatId) {
      handleCreateChat(user.user.id, data.message, setStreamedMessage, setGenerating);
    } else {
      dispatch(addMessage(selectedChatId, data.message, setStreamedMessage, setGenerating));
    }
    reset();
  };

  const message = watch('message', '');

  const handleDelete = (chatId) => {
    handleDeleteChat(chatId, selectedChatId);
    setToasterOpen(true); 
  };

  const handleCloseToaster = () => {
    setToasterOpen(false);
  };


  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: '35px', paddingLeft: '50px', paddingRight: '50px', justifyContent: 'space-between' }}>
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <img src={ArrowIcon} onClick={handleNavigateToAdd} alt="arrow icon" style={{ marginRight: '15px', cursor: 'pointer' }} />
          <Typography variant="h4">Chat With AI System</Typography>
        </Box>
        <img src={CreateChatIcon} onClick={handleCreateNewChat} alt="Create new chat" style={{ cursor: 'pointer' }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', padding: '50px', gap: '50px' }}>
        {/* Chat titles */}
        <Box sx={{ width: '200px', height: '72vh', backgroundColor: '#F9F9F9', borderRadius: '18px', overflowY: 'auto' }}>
          <Box sx={{ overflow: 'auto', pt: 1 }}>
            <List>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : (
                sortedChats.map((chat, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSelectChat(chat.chatId)}
                    selected={selectedChatId === chat.chatId}
                    sx={{
                      mb: '5px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: selectedChatId === chat.chatId ? '#F0F4FA' : 'transparent',
                      borderRadius: selectedChatId === chat.chatId ? '9px' : '0',
                    }}
                  >
                    <Tooltip
                      title={chat.title}
                      arrow
                      sx={{
                        '& .MuiTooltip-tooltip': {
                          backgroundColor: 'white',
                          color: 'black',
                        },
                      }}
                    >
                      <Typography
                        variant='body5'
                        sx={{
                          backgroundColor: selectedChatId === chat.chatId ? '#F0F4FA' : 'transparent',
                          borderRadius: selectedChatId === chat.chatId ? '9px' : '0', 
                        }}
                      >
                        {chat.title.length > 15 ? `${chat.title.substring(0, 15)}...` : chat.title}
                      </Typography>
                    </Tooltip>
                    {selectedChatId === chat.chatId && (
                      deletingChatId === chat.chatId ? (
                        <CircularProgress size={20} />
                      ) : (
                        <CloseIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(chat.chatId);
                          }}
                          sx={{ cursor: 'pointer' }}
                        />
                      )
                    )}
                  </ListItem>

                ))
              )}
            </List>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '82vh', gap: '30px' }}>
          {/* Chat messages */}
          <Box sx={{ position: 'relative', width: '100%', height: '72vh', backgroundColor: '#F9F9F9', borderRadius: '18px', overflow: 'auto', padding: '25px', paddingTop: '60px'}}>
            <Box ref={chatContainerRef} sx={{height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
              {loading ? (
                <Typography>Loading chat history...</Typography>
              ) : (
                chatHistory && chatHistory.map((msg, index) => (
                  <Box key={index} sx={{ mb: 2, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <Box sx={{
                      maxWidth: '50%', 
                      pl: 1.5,
                      pr: 1.5, 
                      borderRadius: msg.role === 'user' ? '33px' : '18px',
                      backgroundColor: msg.role === 'user' ? '#5F46CC' : '#F4F4F4',
                      color: msg.role === 'user' ? 'white' : '#000',
                      textAlign: 'left',
                    }}>
                      <Typography variant="body6"><ReactMarkdown>{msg.message}</ReactMarkdown></Typography>
                    </Box>
                  </Box>
                ))
              )}
              {streamedMessage && (
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
                    <Box sx={{
                      maxWidth: '50%', 
                      p: 1, 
                      borderRadius: '18px',
                      backgroundColor: '#F4F4F4',
                      color: '#000',
                      textAlign: 'left',
                    }}>
                      <Typography variant="body6"><ReactMarkdown>{streamedMessage}</ReactMarkdown></Typography>
                    </Box>
                  </Box>
                )}
            </Box>
            {generating && <Box
                sx={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '182px',
                  height: '42px',
                  background: `linear-gradient(90deg, #1976d2, #9c27b0, #e91e63)`,
                  borderRadius: 2,
                  p: '2px',
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Typography variant='body2'>Generating ...</Typography>
                </Box>
              </Box>
            }
            {!selectedChatId && !chatHistory && <Box
              sx={{
                position: 'absolute',
                top: '50%', 
                left: '50%',
                transform: 'translate(-50%, -50%)', 
                minWidth: '182px',
                height: '42px',
                background: `linear-gradient(90deg, #1976d2, #9c27b0, #e91e63)`,
                borderRadius: 2,
                p: '2px',
              }}
              >
              <Box
                sx={{
                  background: '#fff',
                  width: '100%',
                  height: '100%',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Typography variant='h5'>Write something to chat with our AI Chatbot!</Typography>
              </Box>
              </Box>
            }
          </Box>

          {/* Write messages */}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ width: '100%', height: '65px', backgroundColor: '#F9F9F9', borderRadius: '18px', display: 'flex', alignItems: 'center', px: 2 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message here..."
              {...register('message')}
              sx={{
                mr: 1,
                '& .MuiOutlinedInput-root': {
                  background: '#F9F9F9',
                  '& fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#A4A4A4',
                  fontSize: '16px',
                },
              }}
            />
            <Button
              type="submit" 
              variant="contained"
              color="secondary"
              sx={{ width: '84px', height: '39px', p: 1 }}
              disabled={!message.trim() || streamedMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
      <SuccessToaster open={toasterOpen} onClose={handleCloseToaster} message="Chat deleted successfully!" />
    </Box>
  );
};

export default Chat;