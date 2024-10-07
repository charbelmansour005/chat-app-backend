import { IErrorResponse } from "../index.js";

export function createError(
  status: number,
  name: string,
  message: string
): IErrorResponse {
  return {
    status,
    name,
    message,
  };
}
