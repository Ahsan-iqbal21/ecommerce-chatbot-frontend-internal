import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat } from '../../store/actions/chats/chatActions';

const useCreateChat = () => {
    const dispatch = useDispatch();
    const { selectedChatId, chatHistory } = useSelector(state => state.chats);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateChat = async (userId, initialMessage, setStreamedMessage, setGenerating) => {
        setIsCreating(true);
        
        try {
            const chatPayload = {
                userId,
                chatHistory: {
                    message: initialMessage,
                    role: 'user',
                    timestamp: new Date().toISOString()
                }
            };

            await dispatch(createChat(chatPayload.userId, chatPayload.chatHistory, setStreamedMessage));

        } catch (error) {
            console.error('Error creating chat:', error);
        }

        setIsCreating(false);
        setGenerating(false);
    };

    const clearSelectedChat = () => {
        dispatch({ type: 'CLEAR_SELECTED_CHAT' });
    };

    return {
        isCreating,
        selectedChatId,
        chatHistory,
        handleCreateChat,
        clearSelectedChat
    };
};

export default useCreateChat;
