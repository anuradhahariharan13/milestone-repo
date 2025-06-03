const axios = require('axios');
const config = require('../config/config.json').development;

async function addPrivateNoteToFreshserviceTicket(ticketId, summary) {
  const url = `https://${config.FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets/${ticketId}/notes`;

  try {
    await axios.post(
      url,
      {
        body: `Ticket Summary:\n${summary}`,
        private: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + Buffer.from(`${config.FRESHDESK_API_KEY}:X`).toString('base64')
        }
      }
    );

    console.log(` Private note added to Freshservice ticket ${ticketId}`);
  } catch (error) {
    console.error(` Failed to add note to ticket ${ticketId}:`, error.response?.data || error.message);
    throw error;
  }
}

module.exports = addPrivateNoteToFreshserviceTicket;
