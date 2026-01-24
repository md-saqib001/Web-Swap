import db from './db.js';

// Query to select EVERYTHING from the 'links' table
db.all("SELECT * FROM links", [], (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    
    // Log each row to the console
    console.log(`Found ${rows.length} links:`);
    console.log(rows);
});