import { validationResult } from "express-validator";
import { addCategory } from "../services/category/addCategory";
import { RequestHandler } from "express";
import { createError } from "../utils/errorFormatter";
import { statusCodes } from "../helpers/statusCodes";
import { statusMessages } from "../helpers/statusMessages";
import { fetchCategories } from "../services/category/fetchCategories";
import { deleteCategory } from "../services/category/deleteCategory";
import { fetch1Category } from "../services/category/fetch1Category";
import { updateCategory } from "../services/category/updateCategory";

const errorFormatter = ({ msg }) => {
  return {
    msg,
  };
};

const addCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      throw createError(
        statusCodes.unprocessableEntity,
        statusMessages.unprocessableEntity.title,
        errors
          .array()
          .map((error) => " " + error.msg)
          .toString()
          .trim()
      );
    }
    const data = req.body;
    const result = await addCategory(data);
    return res.status(statusCodes.createSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

const fetchCategoriesController: RequestHandler = async (_, res, next) => {
  try {
    const result = await fetchCategories();
    return res.status(statusCodes.readSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCategoryController: RequestHandler = async (
  { params },
  res,
  next
) => {
  try {
    const { id } = params;
    const result = await deleteCategory(id);
    return res.status(statusCodes.deleteSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

const fetch1CategoryController: RequestHandler = async (
  { params },
  res,
  next
) => {
  try {
    const { id } = params;
    const result = await fetch1Category(id);
    return res.status(statusCodes.readSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCategoryController: RequestHandler = async (req, res, next) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
      throw createError(
        statusCodes.unprocessableEntity,
        statusMessages.unprocessableEntity.title,
        errors
          .array()
          .map((error) => " " + error.msg)
          .toString()
          .trim()
      );
    }
    const id = req.params.id;
    const data = req.body;
    const result = await updateCategory(id, data);
    return res.status(statusCodes.updateSuccess).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  addCategoryController,
  fetchCategoriesController,
  deleteCategoryController,
  updateCategoryController,
  fetch1CategoryController,
};
