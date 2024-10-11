// utils/openai.js
import axios from 'axios';

export const sendMessageToChatGPT = async (message: string) => {
  try {
    const config = useRuntimeConfig();
    const apiKey = config.public.OPENAI_API_KEY; // Make sure to store the API key in your environment variables

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // You can adjust this to other models if needed
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return 'Sorry, there was an error processing your request.';
  }
};
