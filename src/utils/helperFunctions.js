import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token) {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return exp < currentTime;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
  } else if (day === 2 || day === 22) {
      suffix = 'nd';
  } else if (day === 3 || day === 23) {
      suffix = 'rd';
  }

  return formattedDate.replace(/\d+/, `${day}${suffix}`);
};

export const processChatStream = async (reader, decoder, onStreamChunk) => {
  let fullMessage = '';
  let title = '';
  let chatId = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true });
    fullMessage += chunk;

    try {
      const jsonPattern = /\{"title":".*?","id":".*?"\}/g;

      const cleanedChunk = chunk.replace(jsonPattern, '');
      fullMessage = fullMessage.replace(jsonPattern, '');

      onStreamChunk(cleanedChunk);

      const jsonStart = chunk.indexOf('{');
      const jsonEnd = chunk.lastIndexOf('}');
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        const jsonStr = chunk.slice(jsonStart, jsonEnd + 1);
        const data = JSON.parse(jsonStr);
        if (data.title) title = data.title;
        if (data.id) chatId = data.id;
      }
    } catch (error) {
      console.log("Error parsing message", error);
    }
  }

  return { fullMessage, title, chatId };
}