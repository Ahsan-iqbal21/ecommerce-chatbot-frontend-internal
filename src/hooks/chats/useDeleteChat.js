import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteChat } from '../../store/actions/chats/chatActions';
import { CLEAR_SELECTED_CHAT } from '../../store/actionTypes/chats/chatActionTypes';

const useDeleteChat = () => {
  const dispatch = useDispatch();
  const [deletingChatId, setDeletingChatId] = useState(null);

  const handleDeleteChat = async (chatId, selectedChatId) => {
    setDeletingChatId(chatId);
    try {
      await dispatch(deleteChat(chatId));

      if (chatId === selectedChatId) {
        dispatch({ type: CLEAR_SELECTED_CHAT });
      }
    } finally {
      setDeletingChatId(null);  
    }
  };

  return { handleDeleteChat, deletingChatId };
};

export default useDeleteChat;
