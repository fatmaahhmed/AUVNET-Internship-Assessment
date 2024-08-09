import express, { Request, Response } from "express";

import Adminrouter from "./routes/Admin";
import { PrismaClient } from "@prisma/client";
import Userrouter from "./routes/User";
import authMiddleware from "./middlewares/authMiddleware";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { isAdmin } from "./middlewares/roles";
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";
import { seedData } from "./prisma/seed";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(bodyParser.json());

async function startServer() {
  try {
    // Connect to the database
    await prisma.$connect();
    console.log("Database connected successfully.");
    // seedData;

    console.log("Data seeded successfully.");

    // Define routes
    app.get("/", (req: Request, res: Response) => {
      res.send("Hello, World!!!");
    });

    app.use("/users", Userrouter);
    app.use(requestLoggerMiddleware);
    app.use(authMiddleware);
    app.use(isAdmin);
    app.use("/admin", Adminrouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
