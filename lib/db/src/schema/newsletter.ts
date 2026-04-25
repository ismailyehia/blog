import mongoose, { Schema } from "mongoose";

const newsletterSubscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const NewsletterSubscription = mongoose.models.NewsletterSubscription || mongoose.model("NewsletterSubscription", newsletterSubscriptionSchema);
