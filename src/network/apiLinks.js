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

    //Prompt
    static GET_PROMPT = '/prompt';
    static UPDATE_PROMPT = '/prompt';

    //Escalations
    static GET_ALL_ESCALATIONS = '/escalation';
    static CHANGE_ESCALATION_STATUS = (escalationId) => `/escalation/${escalationId}`;

    //Followups
    static GET_ALL_FOLLOWUPS = '/followup';
    static CHANGE_FOLLOWUP_STATUS = (followupId) => `/followup/${followupId}`;
    
}
  
export default ApiLinks;
  