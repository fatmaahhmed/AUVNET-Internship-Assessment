import { Database } from "sqlite";

export const enableForeignKeySupport = async (db: Database) => {
  await db.exec("PRAGMA foreign_keys = ON;");
};
