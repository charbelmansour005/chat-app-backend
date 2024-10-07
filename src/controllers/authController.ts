import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createError } from "../utils/errorFormatter";
import { IUser } from "../models/User";
import { login } from "../services/auth/login";
import { register } from "../services/auth/register";

const errorFormatter = ({ value, msg, param, location }: any) => {
    return {
        msg,
    };
};

export const postLogin: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            throw createError(
                422,
                "Validation Error",
                errors
                    .array()
                    .map(({ msg }) => " " + msg)
                    .toString()
                    .trim()
            );
        }

        const body = req.body as IUser;
        const result = await login(body);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export const putRegister: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);

        if (!errors.isEmpty()) {
            throw createError(
                422,
                "Validation Error",
                errors
                    .array()
                    .map(({ msg }) => " " + msg)
                    .toString()
                    .trim()
            );
        }

        const registerBody = req.body;

        const result = await register(registerBody);

        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};
