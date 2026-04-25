import mongoose, { Schema, Document } from "mongoose";

// Category Schema
const categorySchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: "" },
  color: { type: String, default: "#6366f1" },
});

export const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

// Tag Schema
const tagSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

export const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

// Author Schema
const authorSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatarUrl: { type: String, default: "" },
  bio: { type: String, default: "" },
});

export const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);

// Post Schema
const postSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, default: "" },
  content: { type: String, default: "" },
  coverImageUrl: { type: String, default: "" },
  readingMinutes: { type: Number, default: 5 },
  viewsCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
