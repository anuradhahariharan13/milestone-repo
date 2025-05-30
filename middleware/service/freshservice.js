import axios from 'axios';
import config from '../configs/env.js';

export async function fetchUpdatedTickets(since) {
 const encodedSince = encodeURIComponent(since); 
  const url = `https://${config.FRESHSERVICE_DOMAIN}.freshservice.com/api/v2/tickets?updated_since=${encodedSince}`;

  const res = await axios.get(url, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${config.FRESHSERVICE_API_KEY}:X`).toString('base64')
    }
  });

  return res.data.tickets || [];
}
export default fetchUpdatedTickets
