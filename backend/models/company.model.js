import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    name: {
      required: true,
      type: String,
      unique: true,
    },
    userId: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true },
);

const Company = mongoose.model("Company", companySchema);
export default Company;
