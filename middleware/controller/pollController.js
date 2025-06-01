import { fetchUpdatedTickets } from '../service/freshservice.js';
import { addTicket } from '../utils/helper.js';

let lastChecked = new Date().toISOString();

 async function pollFreshservice() {
  try {
    const tickets = await fetchUpdatedTickets(lastChecked);
    console.log(tickets);

    for (const ticket of tickets) {
      await addTicket(ticket);
    }
    

    console.log("getting tickets");
  } catch (error) {
    console.error('Error polling Freshservice:', error.response?.data || error.message);
  }
}
export default pollFreshservice;