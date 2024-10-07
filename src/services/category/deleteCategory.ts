import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";
import { createError } from "../../utils/errorFormatter";

export async function deleteCategory(_id: any) {
    const foundProdCateg = await Category.findById(_id);

    if (!foundProdCateg) {
        throw createError(
            statusCodes.badRequest,
            statusMessages.globalNotFound.title,
            statusMessages.globalNotFound.message
        );
    }

    const productsExistForCategory = await Product.findOne({ category: _id });

    if (!productsExistForCategory) {
        await Category.findByIdAndDelete(_id);

        const result = statusMessages.deleteSuccess.message;

        return { result };
    } else if (productsExistForCategory) {
        throw createError(
            statusCodes.badRequest,
            statusMessages.deleteFailure.title,
            statusMessages.deleteFailure.message +
                " Products found. Empty the category first, then try again."
        );
    }
}
