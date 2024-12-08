import ApiBaseHelper from '../network/apiBaseHelper';
import ApiLinks from '../network/apiLinks';

class DocumentsService {
  static async getAllDocuments() {
    const response = await ApiBaseHelper.get(ApiLinks.GET_ALL_DOCUMENTS);
    return response;
  }

  static async uploadDocument(file, title) {
    const formData = new FormData();
    formData.append('file', file); 
    formData.append('title', title); 

    const response = await ApiBaseHelper.post(ApiLinks.UPLOAD_DOCUMENT, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
  }

  static async deleteDocument(documentId) {
    const response = await ApiBaseHelper.delete(ApiLinks.DELETE_DOCUMENT(documentId));
    return response;
  }
}

export default DocumentsService;