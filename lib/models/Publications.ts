import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPublication extends Document {
  title: string;
  slug: string;
  category: "Journal" | "Tender";
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    category: {
      type: String,
      enum: ["Journal", "Tender"],
      required: true,
    },

    pdf: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Publication: Model<IPublication> =
  mongoose.models.Publication ||
  mongoose.model<IPublication>("Publication", PublicationSchema);

export default Publication;