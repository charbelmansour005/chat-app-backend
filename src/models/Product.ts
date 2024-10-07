import { Document, ObjectId, Schema, model } from "mongoose";

interface IProduct extends Document {
  category: ObjectId;
  skuNumber?: string;
  title: string;
  description: string;
  shortDescription?: string;
  thumbnailImage: string;
  hoverImage: string;
  altImage?: string;
  seoDescription?: string;
  isFeatured: number;
}

const ProductSchema: Schema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      refPath: "Category",
      required: [true, "Please enter a category"],
    },

    skuNumber: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    shortDescription: {
      type: String,
      required: false,
    },
    thumbnailImage: {
      type: String,
      required: [true, "Please enter a thumbnail image"],
    },
    hoverImage: {
      type: String,
      required: [true, "Please enter a hover image"],
    },
    altImage: {
      type: String,
      required: false,
    },
    seoDescription: {
      type: String,
      required: false,
    },
    isFeatured: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);

export { Product, IProduct };
