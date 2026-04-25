import mongoose, { Schema } from "mongoose";

const contactSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const ContactSubmission = mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", contactSubmissionSchema);
