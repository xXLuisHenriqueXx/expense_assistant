import { type SQLiteDatabase } from "expo-sqlite";

import { seed } from "./seed";

export async function initializeDatabase(database: SQLiteDatabase) {
  console.log("[INITIALIZE] Initializing database...");
  try {
    await database.execAsync(`PRAGMA foreign_keys = ON;`);
    console.log("[INITIALIZE] Foreign keys enabled.");

    // console.log("[INITIALIZE] Dropping tables...");
    // await database.execAsync(`DROP TABLE IF EXISTS user_accounts;`);
    // console.log("[INITIALIZE] User accounts table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS user_expenses;`);
    // console.log("[INITIALIZE] User expenses table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS expense_categories;`);
    // console.log("[INITIALIZE] Expense categories table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS monthly_expenses;`);
    // console.log("[INITIALIZE] Monthly expenses table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS user;`);
    // console.log("[INITIALIZE] User table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS accounts;`);
    // console.log("[INITIALIZE] Accounts table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS categories;`);
    // console.log("[INITIALIZE] Categories table dropped.");
    // await database.execAsync(`DROP TABLE IF EXISTS expenses;`);
    // console.log("[INITIALIZE] Expenses table dropped.");

    console.log("[INITIALIZE] Creating tables...");
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE
        );
    `);
    console.log("[INITIALIZE] User table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS accounts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            slug TEXT NOT NULL UNIQUE,
            type TEXT CHECK(type IN ('bank','digital_wallet')) NOT NULL,
            currency TEXT DEFAULT 'BRL'
        );
    `);
    console.log("[INITIALIZE] Accounts table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );
    `);
    console.log("[INITIALIZE] Categories table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            default_value REAL,
            type TEXT CHECK(type IN ('fixed','variable')) NOT NULL,
            frequency TEXT CHECK(frequency in ('monthly','yearly','weekly')) DEFAULT 'monthly'
        );
    `);
    console.log("[INITIALIZE] Expenses table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS user_accounts (
            user_id INTEGER NOT NULL,
            account_id INTEGER NOT NULL,
            balance REAL NOT NULL DEFAULT 0,
            PRIMARY KEY (user_id, account_id),
            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
            FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
        );
    `);
    console.log("[INITIALIZE] User accounts table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS expense_categories (
            expense_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            PRIMARY KEY (expense_id, category_id),
            FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
        );
    `);
    console.log("[INITIALIZE] Expense categories table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS user_expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            expense_id INTEGER,
            title TEXT,
            description TEXT,
            default_value REAL,
            type TEXT CHECK(type IN ('fixed','variable')) NOT NULL,
            is_active INTEGER CHECK(is_active IN (0,1)) DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
            FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE SET NULL
        );
    `);
    console.log("[INITIALIZE] User expenses table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS monthly_expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_expense_id INTEGER NOT NULL,
            account_id INTEGER,
            year INTEGER NOT NULL,
            month INTEGER CHECK(month BETWEEN 1 AND 12) NOT NULL,
            amount REAL NOT NULL,
            date DATE,
            status TEXT CHECK(status IN('paid','pending')) DEFAULT 'pending',
            FOREIGN KEY (user_expense_id) REFERENCES user_expenses(id) ON DELETE CASCADE,
            FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE SET NULL
        );
    `);
    console.log("[INITIALIZE] Monthly expenses table created.");

    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT
        );    
    `);

    await database.execAsync(
      `CREATE INDEX IF NOT EXISTS idx_monthly_expenses_user ON monthly_expenses(user_expense_id);`
    );
    await database.execAsync(
      `CREATE INDEX IF NOT EXISTS idx_monthly_expenses_ym ON monthly_expenses(year, month);`
    );
    await database.execAsync(
      `CREATE INDEX IF NOT EXISTS idx_user_expenses_user ON user_expenses(user_id);`
    );
    await database.execAsync(
      `CREATE INDEX IF NOT EXISTS idx_user_accounts_user ON user_accounts(user_id);`
    );
    console.log("[INITIALIZE] Indexes created.");

    console.log("[INITIALIZE] Database initialized.");

    const result = await database.getFirstAsync<{ value: string }>(
      `SELECT value FROM meta WHERE key = 'seeded'`
    );

    if (!result) {
      console.log("[INITIALIZE] Seeding database (first time)...");
      await seed(database);

      await database.runAsync(
        `INSERT INTO meta (key, value) VALUES ('seeded', 'true')`
      );
      console.log("[INITIALIZE] Database seeded and marked as initialized.");
    } else {
      console.log("[INITIALIZE] Database already seeded, skipping.");
    }
  } catch (error) {
    console.error("[INITIALIZE] Error initializing database:", error);
  }
}
