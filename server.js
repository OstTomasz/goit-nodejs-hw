import { app } from "./app.js";
import mongoose from "mongoose";

import {
  initDirectory,
  UPLOAD_DIRECTORY,
  AVATARS_DIRECTORY,
} from "./config.js";

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URI;
const connectionpOptions = {
  dbName: `GoIT-HW4`,
};

const connection = mongoose.connect(uriDb, connectionpOptions);

app.listen(PORT, async () => {
  console.log("Connecting to database..");
  try {
    await initDirectory(UPLOAD_DIRECTORY);
    await initDirectory(AVATARS_DIRECTORY);
    await connection;
    console.log("Database connection successful");
    console.log(
      `Server running. Use our API @ http://localhost:${PORT}/api/contacts`
    );
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
});
