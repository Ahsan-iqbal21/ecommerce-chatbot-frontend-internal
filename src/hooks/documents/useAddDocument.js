import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadDocument } from '../../store/actions/documents/documentActions';

const useAddDocument = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const handleFileUpload = async (file) => {
        try {
            setIsUploading(true);
            await dispatch(uploadDocument(file, file.name));
            setSuccessMessage(`Document "${file.name}" uploaded successfully!`);
            setErrorMessage('');
        } catch (error) {
            console.error('Error uploading document:', error.response.data.message);
            setErrorMessage(error.response.data.message); 
            setSuccessMessage(''); 
        } finally {
            setIsUploading(false);
        }
    };

    return {
        isUploading,
        handleFileUpload,
        successMessage,
        errorMessage, 
        setErrorMessage
    };
};

export default useAddDocument;
