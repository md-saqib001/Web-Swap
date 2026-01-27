import basicAuth from 'express-basic-auth';
import 'dotenv/config'; // Make sure we can read the .env file

const password = process.env.ADMIN_PASSWORD || 'defaultPass'; // Fallback if .env fails

export const adminAuth = basicAuth({
    users: { 'admin': password }, // Username is 'admin', Password is from .env
    challenge: true, // Shows the browser popup
    unauthorizedResponse: (req) => {
        return '🚫 Access Denied: Incorrect password.';
    }
});