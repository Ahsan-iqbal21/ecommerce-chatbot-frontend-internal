import { DELETE_DOCUMENT_SUCCESS, DOCUMENTS_ERROR, GET_DOCUMENTS_SUCCESS, UPLOAD_DOCUMENT_SUCCESS } from "../../actionTypes/documents/documentActionTypes";

const initialState = {
    documents: [],
    error: null
};
  
const documentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents: action.payload,
                error: null
            };
        case UPLOAD_DOCUMENT_SUCCESS:
            return {
                ...state,
                documents: [action.payload, ...state.documents],
                error: null
            };
        case DELETE_DOCUMENT_SUCCESS:
            return {
                ...state,
                documents: state.documents.filter(doc => doc.documentId !== action.payload),
                error: null
            };
        case DOCUMENTS_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};
  
export default documentsReducer;  