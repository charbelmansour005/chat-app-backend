import { check } from "express-validator";

const prodCategoryValidations = [
    check("categoryName")
        .isString()
        .withMessage("Category name must be a string")
        .notEmpty()
        .withMessage("Category name must not be empty"),
];
export { prodCategoryValidations };
