import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';
import { processChatStream } from '../utils/helperFunctions';

const HARDCODED_USER_ID = '123e4567-e89b-12d3-a456-426614174002';

class ChatsService {
  static async getChatHistory(chatId) {
    const response = await ApiBaseHelper.get(ApiLinks.GET_CHAT_HISTORY(chatId));
    return response;
  }

  static async getAllChats(userId) {
    const response = await ApiBaseHelper.get(ApiLinks.GET_ALL_CHATS);
    return response;
  }
  
  static async createChat(userId, chatHistory, onStreamChunk) {
    try {
      const response = await fetch(ApiLinks.CREATE_CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': HARDCODED_USER_ID,
        },
        body: JSON.stringify({ userId, chatHistory }),
      });
  
      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser or missing response body.");
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
  
      const { fullMessage, title, chatId } = await processChatStream(reader, decoder, onStreamChunk);
  
      return { fullMessage, title, chatId };
    } catch (error) {
      console.error("Error in streaming chat creation:", error);
      throw error;
    }
  }
  
  static async addMessage(chatId, chatHistory, onStreamChunk) {
    try {
      const response = await fetch(ApiLinks.ADD_MESSAGE(chatId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': HARDCODED_USER_ID,
        },
        body: JSON.stringify(chatHistory),
      });
  
      if (!response.body) {
        throw new Error("ReadableStream not supported in this browser or missing response body.");
      }
  
      const reader = response.body.getReader(); 
      const decoder = new TextDecoder(); 
      let fullMessage = '';
  
      while (true) {
        const { done, value } = await reader.read(); 
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true }); 
        fullMessage += chunk;   
        onStreamChunk(chunk); 
      }
  
      return { fullMessage };
    } catch (error) {
      console.error("Error in streaming message:", error);
      throw error; 
    }
  }

  static async deleteChat(chatId) {
    const response = await ApiBaseHelper.delete(ApiLinks.DELETE_CHAT(chatId));
    return response;
  }
}

export default ChatsService;