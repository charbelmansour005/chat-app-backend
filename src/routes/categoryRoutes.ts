import { Router } from "express";
import { prodCategoryValidations } from "../validations/categoryValidations";
import { isAuth } from "../middleware/isAuth";
import {
    addCategoryController,
    deleteCategoryController,
    fetch1CategoryController,
    fetchCategoriesController,
    updateCategoryController,
} from "../controllers/categoryController";

const router = Router();

router
    .post("/category", prodCategoryValidations, isAuth, addCategoryController)
    .get("/category", fetchCategoriesController)
    .put(
        "/category/:id",
        prodCategoryValidations,
        isAuth,
        updateCategoryController
    )
    .delete("/category/:id", isAuth, deleteCategoryController)
    .get("/category/:id", fetch1CategoryController);

export default router;
