import { statusMessages } from "../../helpers/statusMessages";
import { ITransaction, Transaction } from "../../models/Transaction";
import { User } from "../../models/User";
import { createError } from "../../utils/errorFormatter";

export const mockPayment = async (body: ITransaction, userId: any) => {
    const { amount, type, description } = body;

    if (!userId || !amount || !type || !description) {
        throw createError(
            400,
            statusMessages.createFailure.title,
            "All fields are required."
        );
    }

    if (type !== "credit" && type !== "debit") {
        throw createError(
            400,
            statusMessages.createFailure.title,
            "Invalid transaction type."
        );
    }

    const user = await User.findById(userId);

    if (!user) {
        throw createError(
            400,
            statusMessages.createFailure.title,
            "User not found."
        );
    }

    let newBalance = user.walletBalance;

    if (type === "credit") {
        newBalance += amount;
    } else {
        if (user.walletBalance < amount) {
            throw createError(
                400,
                statusMessages.createFailure.title,
                "Insufficient funds."
            );
        }
        newBalance -= amount;
    }

    user.walletBalance = newBalance;
    await user.save();

    const transaction = new Transaction({
        userId,
        amount,
        type,
        description,
    });
    await transaction.save();
    const message = "Payment processed successfully.";
    return {
        message,
        newBalance,
    };
};
