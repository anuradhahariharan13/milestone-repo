const addPrivateNoteToFreshserviceTicket = require('../services/addPrivateNoteService');
const summarizeTicketText = require('../services/summarizeTicket');
const { getTicketConversations } = require('../services/getTicketConversationsService');
const { processAttachments } = require('../controller/attachmentProcessController');

// Utility to split large text into smaller chunks
function splitIntoChunks(text, chunkSize = 2000) {
  const chunks = [];
  let i = 0;
  while (i < text.length) {
    chunks.push(text.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return chunks;
}

// Summarize each chunk, then return combined summary
async function summarizeLongText(text) {
  const chunks = splitIntoChunks(text);
  const summaries = [];

  for (const chunk of chunks) {
    try {
      const summary = await summarizeTicketText(chunk);
      summaries.push(summary);
    } catch (err) {
      console.error("Error summarizing chunk:", err);
      summaries.push("Summary failed for a section.");
    }
  }

  return summaries.join("\n\n");
}

const handleTicketSummary = async (req, res) => {
  try {
    const ticket = req.body;
    const id=req.body.id
    console.log('Received ticket:', ticket);

    const conversations = await getTicketConversations(ticket.id);
    let attachmentsText = '';

    for (const convo of conversations) {
      if (convo.attachments && convo.attachments.length > 0) {
        try {
          const text = await processAttachments(convo.attachments);
          attachmentsText += text + '\n';
        } catch (err) {
          console.error(`Failed to process attachments for convo ${convo.id}:`, err);
        }
      }
    }

    let fullText = `Ticket Description:\n${ticket.description || ''}\n\n`;

    for (const convo of conversations) {
      const source = convo.incoming ? 'Customer' : 'Agent';
      const message = convo.body_text || convo.body || '';
      fullText += `${source} wrote:\n${message.trim()}\n\n`;
    }

    if (attachmentsText) {
      fullText += `\nExtracted from Attachments:\n${attachmentsText}`;
    }

    const summary = await summarizeLongText(fullText);
    console.log('Generated summary:', summary);

    await addPrivateNoteToFreshserviceTicket(ticket.id, summary);

    res.status(201).json({
      message: "Ticket processed and summary added as private note",
      summary
    });

  } catch (error) {
    console.error('Error in ticket summary controller:', error);
    res.status(500).json({ message: 'Failed to process and summarize ticket' });
  }
};

module.exports = { handleTicketSummary };

