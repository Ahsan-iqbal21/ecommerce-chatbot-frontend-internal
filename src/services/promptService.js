import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';

class PromptService {
  static async getPrompt() {
    const response = await ApiBaseHelper.get(ApiLinks.GET_PROMPT);
    return response;
  }

  static async updatePrompt(file) {
    const formData = new FormData();
    formData.append('file', file); 

    const response = await ApiBaseHelper.patch(ApiLinks.UPDATE_PROMPT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
}

export default PromptService;
