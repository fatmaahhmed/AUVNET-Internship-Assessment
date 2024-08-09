import { NextFunction, Request, Response } from "express";

export interface ExtendedRequest extends Request {
  role?: string;
}
export const isAdmin = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // Check if the user is an admin from token in headers

  if (req.role === "admin") {
    next();
  } else {
    res.status(403).send("Access denied.admin");
  }
};
