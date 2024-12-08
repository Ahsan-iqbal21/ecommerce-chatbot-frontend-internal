import {
    ADD_MESSAGE_SUCCESS,
    CHATS_ERROR,
    CLEAR_SELECTED_CHAT,
    CREATE_CHAT_SUCCESS,
    DELETE_CHAT_SUCCESS,
    GET_CHAT_HISTORY_SUCCESS,
    GET_CHATS_SUCCESS,
    SELECT_CHAT,
    UPDATE_CHAT_HISTORY,
  } from "../../actionTypes/chats/chatActionTypes";
  
  const initialState = {
    chats: [],
    chatHistory: null,
    selectedChatId: null,
    error: null,
  };
  
  const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CHATS_SUCCESS:
        return {
          ...state,
          chats: action.payload,
          error: null
        };
      case GET_CHAT_HISTORY_SUCCESS:
        return {
          ...state,
          chatHistory: action.payload,
          error: null
        };
      case CREATE_CHAT_SUCCESS:
        return {
          ...state,
          chats: [action.payload, ...state.chats],
          selectedChatId: action.payload._id,
          chatHistory: action.payload.messages,
          error: null
        };
      case UPDATE_CHAT_HISTORY:
        return {
          ...state,
          chatHistory: action.payload,
          error: null
        };
      case ADD_MESSAGE_SUCCESS:
        return {
          ...state,
          chats: state.chats.map(chat =>
            chat._id === action.payload.chatId ? { ...chat, messages: action.payload.chatHistory } : chat
          ),
          chatHistory: action.payload.chatHistory,
          error: null
        };
      case DELETE_CHAT_SUCCESS:
        return {
          ...state,
          chats: state.chats.filter(chat => chat._id !== action.payload),
          error: null
        };
      case SELECT_CHAT:
        return {
          ...state,
          selectedChatId: action.payload
        };
      case CLEAR_SELECTED_CHAT:
        return {
          ...state,
          selectedChatId: null,
          chatHistory: null
        };
      case CHATS_ERROR:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default chatsReducer;