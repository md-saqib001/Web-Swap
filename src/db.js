import sqlite from 'sqlite3';

const db = new sqlite.Database('./databse.sqlite')


db.run(`
    CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);
