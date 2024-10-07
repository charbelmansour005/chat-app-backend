import mongoose, { Document, Schema } from "mongoose";

interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    type: "credit" | "debit";
    description: string;
    createdAt?: Date;
}

const TransactionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    amount: { type: Number, required: true },

    type: { type: String, enum: ["credit", "debit"], required: true },

    description: { type: String, required: true },

    createdAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model<ITransaction>(
    "Transaction",
    TransactionSchema
);

export { Transaction, ITransaction };
