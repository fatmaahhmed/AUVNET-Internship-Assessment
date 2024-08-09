import { LoginRequest } from "../DB/sql/models/types";
import { Router } from "express";
import Userrouter from "./User";
import { isAdmin } from "../middlewares/roles";
import jwtMiddleware from "../middlewares/authMiddleware";
import { requestLoggerMiddleware } from "../middlewares/loggerMiddleware";
// import { authMiddleware } from "../middlewares/authMiddleware"; // Assuming you have an auth middleware
import { userService } from "../controllers/User";
