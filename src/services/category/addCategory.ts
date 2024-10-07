import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Category, ICategory } from "../../models/Category";
import { createError } from "../../utils/errorFormatter";

export async function addCategory(categoryData: ICategory) {
    const { categoryName, orderNumber } = categoryData;

    if (!categoryName && !orderNumber) {
        throw createError(
            statusCodes.unprocessableEntity,
            statusMessages.unprocessableEntity.title,
            statusMessages.unprocessableEntity.message
        );
    }

    const productCategory = new Category({
        categoryName,
        orderNumber,
    });

    const result = await productCategory.save();

    return {
        result,
    };
}
