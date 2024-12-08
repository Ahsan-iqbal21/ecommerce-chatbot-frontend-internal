import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChats, selectChat } from '../../store/actions/chats/chatActions';

const useGetChats = () => {
  const dispatch = useDispatch();
  const { chats, chatHistory, selectedChatId } = useSelector(state => state.chats);
  const user = useMemo(() => JSON.parse(localStorage.getItem('userProfile')), []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      if (user && user.user.id && chats.length === 0) {
        setLoading(true);
        await dispatch(getChats(user.user.id));
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    if (user) {
      fetchChats();
    }
  }, [dispatch, user, chats]);

  const handleSelectChat = (chatId) => {
    dispatch(selectChat(chatId));
  };

  return {
    chats,
    chatHistory,
    selectedChatId,
    loading,
    handleSelectChat
  };
};

export default useGetChats;
