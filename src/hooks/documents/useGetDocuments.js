import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocuments, deleteDocument } from '../../store/actions/documents/documentActions';

const useGetDocuments = () => {
  const dispatch = useDispatch();
  const documents = useSelector(state => state.documents.documents);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); 
  
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      await dispatch(getDocuments());
      setLoading(false);
    };

    fetchDocuments();
  }, [dispatch]);

  const handleDelete = async (documentId) => {
    setLoadingId(documentId);
    await dispatch(deleteDocument(documentId));
    setLoadingId(null);
    setSuccessMessage('Document deleted successfully'); 
  };

  const getFileFormat = (fileName) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'Unknown';
  };

  const getFileNameWithoutExtension = (fileName) => {
    const parts = fileName.split('.');
    return parts.length > 1 ? parts.slice(0, -1).join('.') : fileName;
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage('');
  };

  return {
    documents: documents.map(doc => ({
      ...doc,
      formattedName: getFileNameWithoutExtension(doc.title),
      fileFormat: getFileFormat(doc.title),
    })),
    handleDelete,
    loadingId,
    loading,
    successMessage,
    handleCloseSuccessMessage,
  };
};

export default useGetDocuments;
