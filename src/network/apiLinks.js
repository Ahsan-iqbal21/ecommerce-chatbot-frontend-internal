class ApiLinks {
    static API_BASE_URL = import.meta.env.VITE_SERVER_URL;
  
    // User Login
    static LOGIN_URL = '/auth/login';


    //Documents
    static GET_ALL_DOCUMENTS = '/documents';
    static UPLOAD_DOCUMENT = '/documents';
    static DELETE_DOCUMENT = (documentId) => `/documents/${documentId}`;

    //Chats
    static CREATE_CHAT = `${import.meta.env.VITE_SERVER_URL}/chats`
    static ADD_MESSAGE = (chatId) => `${import.meta.env.VITE_SERVER_URL}/chats/addMessage/${chatId}`;
    static GET_CHAT_HISTORY = (chatId) => `/chats/${chatId}`;
    static DELETE_CHAT = (chatId) => `/chats/clear/${chatId}`;
    static GET_ALL_CHATS =  `/chats/get/all`;
    
}
  
export default ApiLinks;
  