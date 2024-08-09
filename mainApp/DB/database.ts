import { Database, open } from "sqlite";

import dotenv from "dotenv";
import { enableForeignKeySupport } from "./enableForeignKeySupport";
import path from "path";
import sqlite3 from "sqlite3";

dotenv.config();

const databasePath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve("./INTERN-database.db");

// Open database connection and enable foreign key support
export const dbPromise = (async () => {
  const db = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  // Enable foreign key support
  await enableForeignKeySupport(db);

  return db;
})();
