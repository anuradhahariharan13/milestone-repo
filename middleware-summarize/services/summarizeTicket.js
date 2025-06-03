const axios =require('axios');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const HUGGINGFACE_API_URL = config.HUGGINGFACE_API_URL
const HUGGINGFACE_API_TOKEN =config.HUGGINGFACE_TOKEN;

async function summarizeTicketText(text) {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].summary_text;
    } else {
      console.warn('Unexpected summary format:', response.data);
      return 'Summary not available.';
    }
  } catch (error) {
    console.error('Error summarizing ticket:', error.response?.data || error.message);
    return 'Summary generation failed.';
  }
}

module.exports= summarizeTicketText;
