
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log(`Mongo URI: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
