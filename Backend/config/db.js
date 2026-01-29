import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not found in environment variables");
    }

    mongoose.connection.once("connected", () => {
      console.log("MongoDB connected successfully ✅");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error ❌:", err);
    });

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "shoesDB",
    });

  } catch (error) {
    console.error("Database connection failed ❌:", error.message);
    process.exit(1); // app crash so server doesn't run without DB
  }
};

export default connectDB;
