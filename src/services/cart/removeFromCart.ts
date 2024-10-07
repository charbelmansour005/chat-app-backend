import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Cart } from "../../models/Cart";
import { createError } from "../../utils/errorFormatter";

export const removeFromCart = async (userId: any, productId: string) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
        throw createError(
            statusCodes.notFound,
            statusMessages.globalNotFound.title,
            statusMessages.globalNotFound.message
        );
    }

    cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
    );

    await cart.save();

    const result = statusMessages.deleteSuccess.title;

    return {
        result,
    };
};
