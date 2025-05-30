import express from 'express';
import pollFreshservice from '../controller/pollController.js';
import pushToFreshdeskController from '../controller/setTicket.js';

const defaultRouter = express.Router();


defaultRouter.get('/getTickets', (req, res) => {
  console.log("Started polling Freshservice every 30s...");
  setInterval(() => {
    pollFreshservice();
  }, 30 * 1000); 

  console.log(" Started pushing to Freshdesk every 1min...");
  setInterval(() => {
    pushToFreshdeskController();
  }, 5* 60 * 1000);

  res.status(200).send("Polling and pushing started");
});

defaultRouter.get('/',(req,res)=>{
  res.status(200).send("middleware up and running");
})

export default defaultRouter;
