import mongoose from "mongoose";

export const connectToDB = async () => {
  const dbUri = process.env.MONGODB_URL;

  if (!dbUri) {
    throw new Error("MONGODB_URL environment variable is not defined");
  }

  try {
    // Prevent multiple connections during development
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(dbUri);

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};