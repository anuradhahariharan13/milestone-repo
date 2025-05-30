function getValidType(typeName) {
  const allowed = [
    "incident", "problem", "request", "question", "service task",
    "general question", "account related", "printer repair/triage",
    "opinyin survey", "puma ops - remittance form"
  ];
  const type = typeName?.toLowerCase() || "incident";
  return allowed.includes(type) ? type : "incident";
}

function getValidPriority(priority) {
  return [1, 2, 3, 4].includes(priority) ? priority : 1;
}

function getValidStatus(status) {
  return [2, 3, 4, 5].includes(status) ? status : 2;
}

exports = {
  onTicketCreateHandler: async function (args) {
    const data = args.data;

    const ticket = {
      subject: data.ticket.subject || "No subject provided",
      description: data.ticket.description || "No description provided",
      email: data.ticket.responder_email || "support@example.com",
      priority: getValidPriority(data.ticket.priority),
      status: getValidStatus(data.ticket.status),
      type: getValidType(data.ticket.type_name)
    };

    try {
      await $request.invokeTemplate("createFreshdeskTicket", {
        iparam: {
          api_key: args.iparams.api_key
        },
        body: JSON.stringify(ticket)
      });
      console.log("Freshdesk ticket created successfully.");
    } catch (error) {
      console.error("Error creating Freshdesk ticket:", error);
    }
  }
};
