import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected!");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URL || "");

    // console.log("Logging db from mongoConenction", db); //logging Db;

    connection.isConnected = db.connections[0].readyState;

    // console.log("Logging connections from db", db.connections);

    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("ERROR:Database Connection failed", error);
    process.exit(1);
  }
}

export default dbConnection;
