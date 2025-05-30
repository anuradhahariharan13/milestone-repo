import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketId: { type: Number, required: true, unique: true },
  subject: String,
  description: String,
  email: String,
  priority: Number,
  status: Number,
  type: String
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;