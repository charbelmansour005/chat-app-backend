import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Cart } from "../../models/Cart";
import { createError } from "../../utils/errorFormatter";

export const getCartByUser = async (userId: any) => {
    const result = await Cart.findOne({ userId }).populate("items.productId");

    if (!result) {
        throw createError(
            statusCodes.notFound,
            statusMessages.globalNotFound.title,
            statusMessages.globalNotFound.message
        );
    }

    return {
        result,
    };
};
