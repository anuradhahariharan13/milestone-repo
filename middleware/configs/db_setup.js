import mongoose from "mongoose";
import { }from 'dotenv/config'


async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

export default connectDb;
