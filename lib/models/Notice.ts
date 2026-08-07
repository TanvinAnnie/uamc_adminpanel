import mongoose, { Document, Model, Schema } from "mongoose";

export interface INotice extends Document {
  title: string;
  slug: string;
  category:
    | "General Notice"
    | "Admission Notice"
    | "Reports"
    | "Job Circular";
  pdf: string;
  date: string;
  time: string;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const NoticeSchema = new Schema<INotice>(
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
      enum: [
        "General Notice",
        "Admission Notice",
        "Reports",
        "Job Circular",
      ],
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

const Notice: Model<INotice> =
  mongoose.models.Notice ||
  mongoose.model<INotice>("Notice", NoticeSchema);

export default Notice;