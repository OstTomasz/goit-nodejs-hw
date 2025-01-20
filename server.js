import { app } from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_URI;
const connectionpOptions = {
  dbName: `db-contacts`,
};

const connection = mongoose.connect(uriDb, connectionpOptions);

app.listen(PORT, async () => {
  console.log("Connecting to database..");
  try {
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
