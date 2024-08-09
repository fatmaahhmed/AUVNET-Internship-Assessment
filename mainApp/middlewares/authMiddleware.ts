import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export interface ExtendedRequest extends Request {
  role?: string;
}

require("dotenv").config();

// Define the type for JWT payload
export type JwtPayload = {
  email: string;
  name: string;
  role: string;
};

const jwtMiddleware = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from the 'Authorization' header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).send("Access denied.from jwt");
    }

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(403).send("Access denied. from token");

    // Verify the token
    const privateKey = process.env.GETPRIVATEKEY;
    if (!privateKey) {
      throw new Error("Private key is not defined in environment variables.");
    }
    // Log the token and secret key
    console.log("Token:", token);
    console.log("Private Key:", privateKey);

    const decoded = jwt.verify(token, privateKey) as JwtPayload;
    console.log("Decoded Token:", decoded);
    // Add the decoded user to the request object
    req.role = decoded.role;

    // Check for name and email in the token payload
    if (!decoded.email || !decoded.name) {
      return res.status(403).send("Access denied.from encoded");
    }
    next();
  } catch (error) {
    console.error("Failed to authenticate token:", error);
    res.status(400).send("Invalid token");
  }
};

export default jwtMiddleware;
