import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    vehicleNumber: { type: String, required: true, uppercase: true, trim: true },
    dateOfBirth: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    licenceNumber: { type: String, required: true, uppercase: true, trim: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
