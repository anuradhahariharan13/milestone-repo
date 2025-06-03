const Ticket =require('../models/ticketModel');

async function addTicket(ticket) {
  try {
    await Ticket.updateOne(
      { ticketId: ticket.id },
      {
        ticketId: ticket.id,
        subject: ticket.subject || "No subject",
        description: ticket.description_text || "No description",
        email: ticket.requester?.email || "support@example.com",
        priority: ticket.priority || 1,
        status: ticket.status || 2,
        type: ticket.type || "incident"
      },
      { upsert: true }
    );
  } catch (err) {
    console.error("Failed to add ticket:", err.message);
  }
}


async function getTickets() {
  return await Ticket.find({});
}


async function clearTickets() {
  await Ticket.deleteMany({});
}

module.export= {addTicket,getTickets,clearTickets};

