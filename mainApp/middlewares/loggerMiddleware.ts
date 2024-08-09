import { RequestHandler } from "express";

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(req.method, req.path, "- body:", req.body);

  // Extract token from the 'Authorization' header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token found in request");
  } else {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
  }

  next();
};
