import { Document, Schema, model, Types } from "mongoose";

interface ICartItem {
    productId: Types.ObjectId;
    quantity: number;
}

interface ICart extends Document {
    userId: Types.ObjectId;
    items: ICartItem[];
}

const CartSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
});

const Cart = model<ICart>("Cart", CartSchema);

export { Cart, ICart };
