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

    if (tickets.length) {
      const latestUpdated = tickets
        .map(t => new Date(t.updated_at))
        .sort((a, b) => b - a)[0]
        .toISOString();

      lastChecked = latestUpdated;
    }
    lastChecked=new Date().toISOString();

   

    console.log("getting tickets");
  } catch (error) {
    console.error('Error polling Freshservice:', error.response?.data || error.message);
  }
}
export default pollFreshservice;