import mongoose from "mongoose";
import { Cart } from "../../models/Cart";
import { createError } from "../../utils/errorFormatter";
import { statusMessages } from "../../helpers/statusMessages";

export const addToCartService = async (
    userId: string | any,
    productId: string,
    quantity: number
) => {
    if (!userId || !productId || !quantity) {
        throw createError(
            400,
            statusMessages.createFailure.title,
            "User, product or quantity are missing."
        );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    const cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
        const newCart = new Cart({
            userId: userObjectId,
            items: [{ productId: productObjectId, quantity }],
        });
        return newCart.save();
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productObjectId.toString()
    );

    if (itemIndex > -1) {
        // if the product was found in the cart
        cart.items[itemIndex].quantity += quantity;
    } else {
        cart.items.push({ productId: productObjectId, quantity });
    }

    await cart.save();
    const message = "Added to Cart successfully.";
    return {
        message,
    };
};
