import mongoose from "mongoose";
import debug from "debug";

const log = debug("mongodb");

let conn = null;

export const mongoConnect = async (mongoUrl) => {
  if (conn !== null) {
    log("Reusing DB client");
    return conn;
  }

  const { MONGO_URL } = process.env;
  log("MONGO_URL:", mongoUrl || MONGO_URL);

  try {
    log("Creating new DB client");
    conn = await mongoose.connect(mongoUrl || MONGO_URL, {
      serverSelectionTimeoutMS: 15000,
    });
    log("Connected", conn);

    // `await`ing connection after assigning to the `conn` variable
    // to avoid multiple function calls creating new connections
    await conn;

    // create index
    // await createIndex({ name: 1 }, { unique: true });
  } catch (err) {
    log(err);
    throw err;
  }

  return conn;
};

export const mongoDisconnect = async () => {
  if (conn) await mongoose.connection.close();
  conn = null;
  log("DB disconnected");
};
