const express = require('express');
const pollFreshservice= require('../controller/pollFreshServiceTicket.js');
const pushToFreshdeskController =require('../controller/setTicketFreshDesk.js');
const summarizeTicketText= require('../services/summarizeTicket.js')
const {handleTicketSummary} =require ('../controller/ticketSummaryController.js');

const defaultRouter = express.Router();


defaultRouter.get('/getTickets', (req, res) => {
  console.log("Started polling Freshservice every 30s...");
  setInterval(() => {
    pollFreshservice();
  }, 30 * 1000); 

  console.log(" Started pushing to Freshdesk every 1min...");
  setInterval(() => {
    pushToFreshdeskController();
  }, 2* 60 * 1000);

  res.status(200).send("Polling and pushing started");
});

defaultRouter.get('/',async(req,res)=>{
  res.status(200).send("middleware up and running");
})

defaultRouter.post('/getTicket', handleTicketSummary);

module.exports=defaultRouter;
