import { Document, Schema, model } from "mongoose";

interface ICategory extends Document {
    categoryName: string;
    orderNumber?: number;
}

const CategorySchema: Schema = new Schema(
    {
        categoryName: {
            type: String,
            required: [true, "Please enter your product category's name"],
        },
        orderNumber: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Category = model<ICategory>("Category", CategorySchema);

export { Category, ICategory };
