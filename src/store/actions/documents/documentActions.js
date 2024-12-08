import {
    GET_DOCUMENTS_SUCCESS,
    UPLOAD_DOCUMENT_SUCCESS,
    DELETE_DOCUMENT_SUCCESS,
    DOCUMENTS_ERROR
} from '../../actionTypes/documents/documentActionTypes';
import DocumentsService from '../../../services/documentsService';

export const getDocuments = () => async (dispatch) => {
    try {
        const response = await DocumentsService.getAllDocuments();
        dispatch({ type: GET_DOCUMENTS_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DOCUMENTS_ERROR, payload: error.response.data.message });
        throw error;
    }
};

export const uploadDocument = (file, title) => async (dispatch) => {
    try {
        const response = await DocumentsService.uploadDocument(file, title);
        dispatch({ type: UPLOAD_DOCUMENT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DOCUMENTS_ERROR, payload: error.response.data.message });
        throw error;
    }
};

export const deleteDocument = (documentId) => async (dispatch) => {
    try {
        await DocumentsService.deleteDocument(documentId);
        dispatch({ type: DELETE_DOCUMENT_SUCCESS, payload: documentId });
    } catch (error) {
        dispatch({ type: DOCUMENTS_ERROR, payload: error.response.data.message });
        throw error;
    }
};
