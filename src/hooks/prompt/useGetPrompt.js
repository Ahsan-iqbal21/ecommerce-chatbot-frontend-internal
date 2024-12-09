import { useState } from 'react';
import PromptService from '../../services/promptService';

const useGetPrompt = () => {
  const [prompt, setPrompt] = useState(null);

  const getPrompt = async () => {
    try {
      const response = await PromptService.getPrompt();
      console.log("res: ", response)
      setPrompt(response.data.prompt);
      return response.data.prompt;
    } catch (error) {
      console.error('Error fetching prompt:', error);
      return null;
    }
  };

  return { prompt, getPrompt };
};

export default useGetPrompt;
