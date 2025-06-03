const axios = require('axios');
const config = require('../config/config.json').development;

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
const HUGGINGFACE_API_TOKEN = config.HUGGINGFACE_TOKEN;

async function generateSummary(text) {
  try {
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].summary_text;
    } else {
      console.warn('Unexpected summary format:', response.data);
      return 'Summary not available.';
    }
  } catch (error) {
    console.error('Error generating summary:', error.response?.data || error.message);
    return 'Summary generation failed.';
  }
}

module.exports = generateSummary;
