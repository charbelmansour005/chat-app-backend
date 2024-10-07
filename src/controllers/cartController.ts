import { RequestHandler } from "express";
import { addToCartService } from "../services/cart/addToCart";
import { getCartByUser } from "../services/cart/getUserCart";
import { removeFromCart } from "../services/cart/removeFromCart";
import { statusCodes } from "../helpers/statusCodes";

export const addToCart: RequestHandler = async (
    { body, userId },
    res,
    next
) => {
    try {
        const { productId, quantity } = body;
        const result = await addToCartService(userId, productId, quantity);
        res.status(statusCodes.readSuccess).json(result);
    } catch (error) {
        next(error);
    }
};

export const getCart: RequestHandler = async ({ userId }, res, next) => {
    try {
        const result = await getCartByUser(userId);
        res.status(statusCodes.readSuccess).json(result);
    } catch (error) {
        next(error);
    }
};

export const removeFromUserCart: RequestHandler = async (
    { userId, body },
    res,
    next
) => {
    try {
        const { productId } = body;
        const result = await removeFromCart(userId, productId);
        res.status(statusCodes.deleteSuccess).json(result);
    } catch (error) {
        next(error);
    }
};
