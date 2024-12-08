import {
    GET_CHATS_SUCCESS,
    GET_CHAT_HISTORY_SUCCESS,
    CREATE_CHAT_SUCCESS,
    ADD_MESSAGE_SUCCESS,
    DELETE_CHAT_SUCCESS,
    SELECT_CHAT,
    CHATS_ERROR,
    UPDATE_CHAT_HISTORY
} from '../../actionTypes/chats/chatActionTypes';
import ChatsService from '../../../services/chatsService';

export const getChats = (userId) => async (dispatch) => {
    try {
        const response = await ChatsService.getAllChats(userId);
        dispatch({ type: GET_CHATS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CHATS_ERROR, payload: error.message });
    }
};

export const selectChat = (chatId) => (dispatch, getState) => {
    const { chats } = getState().chats;
    const selectedChat = chats.find(chat => chat._id === chatId);

    if (selectedChat) {
        dispatch({ type: GET_CHAT_HISTORY_SUCCESS, payload: selectedChat.messages });
    }

    dispatch({ type: SELECT_CHAT, payload: chatId });
};

export const createChat = (userId, message, setStreamedMessage) => async (dispatch) => {
  try {
    const chatHistory = [message];
    dispatch({ type: UPDATE_CHAT_HISTORY, payload: chatHistory });

    const response = await ChatsService.createChat(userId, chatHistory, (chunk) => {
      setStreamedMessage((prev) => prev + chunk);
    });

    const assistantMessage = {
      message: response.fullMessage,
      role: 'assistant',
      timestamp: new Date().toISOString()
    };

    const updatedChatHistory = [...chatHistory, assistantMessage];
    const newChat = {
      _id: response._id,
      userId: userId,
      messages: updatedChatHistory,
      title: response.title,
      createdAt: response.createdAt,
    };

    dispatch({ type: UPDATE_CHAT_HISTORY, payload: updatedChatHistory });
    dispatch(selectChat(newChat._id));
    dispatch({
      type: CREATE_CHAT_SUCCESS,
      payload: newChat
    });
    setStreamedMessage('');
  } catch (error) {
    dispatch({ type: CHATS_ERROR, payload: error.message });
  }
};

export const addMessage = (chatId, newMessage, setStreamedMessage, setGenerating) => async (dispatch, getState) => {
  try {
    const { chats } = getState().chats;
    const selectedChat = chats.find(chat => chat._id === chatId);

    if (!selectedChat) {
      throw new Error('Chat not found');
    }

    const userMessage = { message: newMessage, role: 'user', timestamp: new Date().toISOString() };
    const updatedChatHistory = [...selectedChat.messages, userMessage];

    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      payload: { chatId, chatHistory: updatedChatHistory }
    });

    const response = await ChatsService.addMessage(chatId, updatedChatHistory, (chunk) => {
      console.log("steam", chunk);
      setStreamedMessage((prev) => prev + chunk);
    });

    const gptResponse = { message: response.fullMessage, role: 'assistant', timestamp: new Date().toISOString() };

    dispatch({
      type: ADD_MESSAGE_SUCCESS,
      payload: { chatId, chatHistory: [...updatedChatHistory, gptResponse] }
    });

    setStreamedMessage('');
    setGenerating(false);
  } catch (error) {
    dispatch({ type: CHATS_ERROR, payload: error.message });
  }
};

export const deleteChat = (chatId) => async (dispatch) => {
    try {
        await ChatsService.deleteChat(chatId);
        dispatch({ type: DELETE_CHAT_SUCCESS, payload: chatId });
    } catch (error) {
        dispatch({ type: CHATS_ERROR, payload: error.message });
    }
};
