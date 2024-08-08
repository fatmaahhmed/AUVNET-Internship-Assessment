import { Request, Response } from "express";

import { createTables } from "./createTables";
import { dbPromise } from "./database";
import { enableForeignKeySupport } from "./enableForeignKeySupport";

export const testDB = async (req: Request, res: Response) => {
  try {
    const db = await dbPromise;
    await db.get("SELECT 1");
    console.log("Database is connected successfully.");

    // Call createTables after successfully connecting to the database
    await createTables();

    res.status(200).json({ message: "Database is connected successfully." });
  } catch (err) {
    console.error("Database connection failed:", err);
    res
      .status(500)
      .json({ error: "Database connection failed: " + (err as Error).message });
  }
};
