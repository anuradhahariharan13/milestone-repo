const fetchUpdatedTickets =require('../services/freshservice.js');
const addTicket=require('../repositories/ticketRepository.js');

let lastChecked = new Date().toISOString();

 async function pollFreshservice() {
  try {
    const tickets = await fetchUpdatedTickets(lastChecked);
    console.log(tickets);

    for (const ticket of tickets) {
      await addTicket(ticket);
    }

    if (tickets.length) {
      lastChecked = new Date().toISOString(); 
    }

    console.log("getting tickets");
  } catch (error) {
    console.error('Error polling Freshservice:', error.response?.data || error.message);
  }
}
module.export= pollFreshservice;