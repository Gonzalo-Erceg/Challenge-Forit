import { Response } from "express";
import { ApiResponse } from "../types/ApiResponse.js";
export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "Operacion exitosa",
  status = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data: data,
  };
  return res.status(status).json(response);
}

export function sendError(
  res: Response,
  error: any,
  message = "Error en la solicitud",
  status = 500
) {
  const response: ApiResponse<null> = {
    success: false,
    message,
    error,
  };

  return res.status(status).json(response);
}
