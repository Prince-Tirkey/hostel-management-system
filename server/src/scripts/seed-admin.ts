import "dotenv/config";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { User } from "../modules/auth/user.model.js";

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@campus.in";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Admin@123";

const ADMIN_NAME = process.env.ADMIN_NAME ?? "CampusNest Admin";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI as string);

    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({
      email: ADMIN_EMAIL.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await User.create({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: "ADMIN",
    });

    console.log("Admin created successfully");
    console.log(`Email: ${ADMIN_EMAIL}`);
    console.log("Role: ADMIN");
  } catch (err) {
    console.error("Failed to seed admin: ", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin();
