// One-time reset script.
// Deletes every existing user from the database, since old accounts were
// created before Date of Birth, Address, and Licence Number became
// required fields. After running this, the app starts with a clean,
// empty user base — everyone will need to register again.
//
// Run from the server folder:
//   node src/scripts/reset-users.js
//
// Make sure your .env (with MONGO_URI) is set up before running this.

import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const run = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car-insurance";

  console.log(`Connecting to ${uri}`);
  await mongoose.connect(uri);

  const result = await User.deleteMany({});

  console.log(`Deleted ${result.deletedCount ?? 0} user(s). The database is now empty.`);

  await mongoose.disconnect();
  console.log("Done.");
};

run().catch((error) => {
  console.error("Reset failed:", error.message);
  process.exit(1);
});
