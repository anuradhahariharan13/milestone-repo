import axios from 'axios';
import config from '../configs/env.js';

const allowedTypes = [
  "incident", "Problem", "Request", "Question", "Service Task",
  "General Question", "Account Related", "Printer Repair/Triage",
  "Opinyin Survey", "Puma Ops - Remittance Form"
];

function sanitizeType(type) {
  if (!type) return "incident";
  const match = allowedTypes.find(t => t.toLowerCase() === type.toLowerCase());
  return match || "incident";
}

async function pushTicket(ticket) {
  return axios.post(`https://${config.FRESHDESK_DOMAIN}.freshdesk.com/api/v2/tickets`, {
    subject: ticket.subject || "No subject",
    description: ticket.description || "No description",
    email: ticket.email || "support@example.com",
    priority: ticket.priority || 1,
    status: ticket.status || 2,
    type: sanitizeType(ticket.type)
  }, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${config.FRESHDESK_API_KEY}:X`).toString('base64'),
      'Content-Type': 'application/json'
    }
  });
}

export default pushTicket;
