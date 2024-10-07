import { statusCodes } from "../../helpers/statusCodes";
import { statusMessages } from "../../helpers/statusMessages";
import { Category } from "../../models/Category";
import { createError } from "../../utils/errorFormatter";

export async function fetch1Category(_id: any) {
    if (!_id) {
        throw createError(
            statusCodes.badRequest,
            statusMessages.unprocessableEntity.title,
            statusMessages.unprocessableEntity.message
        );
    }

    const result = await Category.findById(_id);

    if (!result) {
        throw createError(
            statusCodes.badRequest,
            statusMessages.globalNotFound.title,
            statusMessages.globalNotFound.message
        );
    }

    return { result };
}
