import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Singleton database connection
let db = null;

/**
 * Get the database connection instance
 * Creates a new connection if one doesn't exist
 */
export async function getDb() {
  if (!db) {
    db = await open({
      filename: process.env.DATABASE_PATH || './nonprofit.db',
      driver: sqlite3.Database,
    });

    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');

    // Create a function to handle GROUP_CONCAT
    db.function('GROUP_CONCAT', (values) => {
      return values.join(', ');
    });
  }

  return db;
}

/**
 * Close the database connection
 * Useful for tests and cleanup
 */
export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
  }
}
