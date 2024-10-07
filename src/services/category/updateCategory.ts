import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Category, ICategory } from "../../models/Category";
import { createError } from "../../utils/errorFormatter";

export async function updateCategory(_id: any, data: ICategory) {
    const { categoryName, orderNumber } = data;

    if (!categoryName && !orderNumber) {
        throw createError(
            statusCodes.unprocessableEntity,
            statusMessages.unprocessableEntity.title,
            statusMessages.unprocessableEntity.message
        );
    }

    const foundProdCategory = await Category.findById(_id);

    if (!foundProdCategory) {
        throw createError(
            statusCodes.badRequest,
            statusMessages.globalNotFound.title,
            statusMessages.globalNotFound.message
        );
    }

    if (orderNumber) {
        foundProdCategory.orderNumber = orderNumber;
    }

    if (categoryName) {
        foundProdCategory.categoryName = categoryName;
    }

    const result = await foundProdCategory.save();
    return {
        result,
    };
}
