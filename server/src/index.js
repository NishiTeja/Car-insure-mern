import "dotenv/config";
import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import { requireAuth } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const seedDocsDir = path.join(rootDir, "seed-documents");

const app = express();
const port = process.env.PORT || 5000;

fs.mkdirSync(seedDocsDir, { recursive: true });

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const makeToken = (user) =>
  jwt.sign({ id: user._id, username: user.username, email: user.email, vehicleNumber: user.vehicleNumber }, process.env.JWT_SECRET || "dev-secret", {
    expiresIn: "7d"
  });

const staticDocuments = [
  {
    id: "cover-insurance",
    name: "Cover Insurance.pdf",
    filePath: path.join(seedDocsDir, "Cover Insurance.pdf")
  },
  {
    id: "insurance-agreement",
    name: "Insurance Agreement.pdf",
    filePath: path.join(seedDocsDir, "Insurance Agreement.pdf")
  }
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password, email, vehicleNumber, dateOfBirth, address, licenceNumber } = req.body;

    if (!username || !password || !email || !vehicleNumber || !dateOfBirth || !address || !licenceNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email: email.toLowerCase() }] });
    if (existing) {
      return res.status(409).json({ message: "An account with those details already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      vehicleNumber,
      dateOfBirth,
      address,
      licenceNumber,
      passwordHash
    });

    res.status(201).json({
      token: makeToken(user),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        vehicleNumber: user.vehicleNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        licenceNumber: user.licenceNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", detail: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });

    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      token: makeToken(user),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        vehicleNumber: user.vehicleNumber,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        licenceNumber: user.licenceNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", detail: error.message });
  }
});

app.get("/api/me", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "username email vehicleNumber dateOfBirth address licenceNumber createdAt updatedAt"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ user });
});

app.get("/api/documents", requireAuth, async (req, res) => {
  res.json({
    documents: staticDocuments.map((doc) => ({
      id: doc.id,
      name: doc.name,
      status: "Not Viewed",
      downloadUrl: `/api/documents/${doc.id}/download`
    }))
  });
});

app.get("/api/documents/:id/download", requireAuth, async (req, res) => {
  const { id } = req.params;
  const staticDoc = staticDocuments.find((doc) => doc.id === id);

  if (staticDoc) {
    return res.download(staticDoc.filePath, staticDoc.name);
  }

  return res.status(404).json({ message: "Document not found" });
});
console.log(process.env.MONGO_URI)
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car-insurance")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
