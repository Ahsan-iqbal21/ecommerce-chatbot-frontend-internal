import { useState } from 'react';
import PromptService from '../../services/promptService';

const useUpdatePrompt = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePrompt = async (promptText) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new Blob([promptText], { type: 'text/plain' });
      await PromptService.updatePrompt(formData);
      setLoading(false);
      return true;
    } catch (error) {
      setError('Failed to update prompt.');
      console.error('Error updating prompt:', error);
      setLoading(false);
      return false;
    }
  };

  return { updatePrompt, loading, error, setError };
};

export default useUpdatePrompt;
