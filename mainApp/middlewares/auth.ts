import jwt from "jsonwebtoken";
require("dotenv").config();

// Define the type for JWT payload
export type JwtPayload = {
  email: string;
  role: string;
  name: string;
};

// Function to generate an authentication token
const generateAuthToken = (payload: JwtPayload): string => {
  const privateKey = process.env.GETPRIVATEKEY; // Make sure this matches your .env file
  if (!privateKey) {
    throw new Error("Private key is not defined in environment variables.");
  }
  const token = jwt.sign(payload, privateKey, { expiresIn: "1h" });
  console.log(token);
  return token;
};

export default generateAuthToken;
