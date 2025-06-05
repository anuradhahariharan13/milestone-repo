const axios = require('axios');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const authHeader = 'Basic ' + Buffer.from(config.FRESHDESK_API_KEY + ':X').toString('base64');

async function getTicketConversations(ticketId) {
  const url = `https://effy-opinyin.freshdesk.com/api/v2/tickets/1524/conversations`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Freshdesk API response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received from Freshdesk API:', error.request);
    } else {
      console.error('Error setting up Freshdesk API request:', error.message);
    }
    throw new Error('Failed to fetch conversations from Freshdesk');
  }
}

module.exports = { getTicketConversations };
