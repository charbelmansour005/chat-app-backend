import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { createError } from "../utils/errorFormatter";
import { variables } from "../helpers/variables";

export const isAdmin: RequestHandler = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");

        if (!authHeader) {
            throw createError(401, "Unauthenticated", "Unauthenticated");
        }

        const access_token = authHeader.split(" ")[1];

        let decodedToken: string | JwtPayload;

        decodedToken = verify(access_token, variables.SECRET as string) as {
            userId: string;
            role: string;
        };

        if (req.userId && decodedToken.role === "admin") {
            return next();
        }
        throw createError(403, "Unauthorized", "Unauthorized");
    } catch (error) {
        next(error);
    }
};
