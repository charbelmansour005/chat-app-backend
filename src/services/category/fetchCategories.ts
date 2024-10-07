import { statusMessages } from "../../helpers/statusMessages";
import { Category } from "../../models/Category";
import { Product } from "../../models/Product";

interface IResponse {
    message: string;
    result: [] | {};
}

export async function fetchCategories() {
    const categories = await Category.find();

    let response: IResponse | string = "";

    if (!categories) {
        response = {
            message: statusMessages.readSuccess.title,
            result: [],
        };

        return response;
    }

    const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
            const productCount = await Product.countDocuments({
                category: category._id,
            });
            return {
                ...category.toObject(),
                productCount,
            };
        })
    );

    response = {
        message: statusMessages.readSuccess.title,
        result: categoriesWithCounts,
    };

    return response;
}
