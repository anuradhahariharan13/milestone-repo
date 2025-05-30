import { getTickets, clearTickets } from '../utils/helper.js';
import pushTicket from '../service/setTicketService.js'; 


async function pushToFreshdeskController() {
  const tickets = await getTickets();
  if (!tickets.length) return;

  for (const ticket of tickets) {
    try {
      await pushTicket(ticket);
      console.log(`Pushed ticket ${ticket.id || ''} to Freshdesk`);
      clearTickets();
    } catch (err) {
      console.error(`Failed to push ticket ${ticket.id || ''}:`, err.response?.data || err.message);
    }
  }
}

export default pushToFreshdeskController;
