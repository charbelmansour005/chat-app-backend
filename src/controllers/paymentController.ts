import { NextFunction, Request, Response } from "express";
import { ITransaction } from "../models/Transaction";
import { mockPayment } from "../services/payments/mockPayment";

export const postMockPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const body = req.body as ITransaction;
        const userId = req.userId;
        const result = await mockPayment(body, userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
