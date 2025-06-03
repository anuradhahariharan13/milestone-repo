const addPrivateNoteToFreshserviceTicket = require('../services/addPrivateNoteService');
const summarizeTicketText = require('../services/summarizeTicket');

const handleTicketSummary = async (req, res) => {
  try {
    const ticket = req.body;
    console.log(' Received ticket:', ticket);

    const summary = await summarizeTicketText(ticket.description || '');
    console.log(' Generated summary:', summary);

    await addPrivateNoteToFreshserviceTicket(ticket.id, summary);

    res.status(201).json({
      message: "Ticket processed and summary added as private note",
      summary
    });
  } catch (error) {
    console.error(' Error in ticket summary controller:', error);
    res.status(500).json({ message: 'Failed to process and summarize ticket' });
  }
};

module.exports = { handleTicketSummary };
