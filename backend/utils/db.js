import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URL);,
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "social-media",
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
