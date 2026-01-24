import sqlite from 'sqlite3';

// Open the Database Connection
const db = new sqlite.Database('./database.sqlite')

// Create the Table
db.run(`
    CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// Export the connection
export default db;
