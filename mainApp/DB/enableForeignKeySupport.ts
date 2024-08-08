import { Database, open } from "sqlite";

import sqlite3 from "sqlite3";

// Function to enable foreign key support
export const enableForeignKeySupport = async (
  db: Database<sqlite3.Database, sqlite3.Statement>
) => {
  await db.exec("PRAGMA foreign_keys = ON;");
};
