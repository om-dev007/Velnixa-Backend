import { UserDocument } from "../types/type";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name field is required to create an account"],
    },
    email: {
      type: String,
      required: [true, "Email field is required to create an account"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model<UserDocument>("user", userSchema);