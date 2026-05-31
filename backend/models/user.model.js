import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    fullName: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: String,
      unique: true,
    },
    profile: {
      bio: { type: String },
      company: { ref: "Company", type: mongoose.Schema.Types.ObjectId },
      profilePhoto: { default: "", type: String },
      resume: { type: String },
      resumeOriginalName: { type: String },
      skills: [{ type: String }],
    },
    role: {
      enum: ["student", "recruiter"],
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
