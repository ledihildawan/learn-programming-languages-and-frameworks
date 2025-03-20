import {
  DB_URI,
  NODE_ENV,
} from "../config/env.js";

import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Database connection error:", error);
    
    console.dir(error);

    process.exit(1);
  }
}

export default connectToDatabase;
