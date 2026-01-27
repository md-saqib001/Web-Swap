// src/middleware/rateLimit.js
import rateLimit from 'express-rate-limit';

// Rule 1: "The Heavy Guard" for Adding Links
// Allows only 5 requests every 5 minutes per IP address
export const addLinkLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        error: "Too many links added! Please wait 5 minutes before contributing again."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Rule 2: "The Light Guard" for Spinning the Wheel
// Allows 100 spins every 15 minutes (generous, but stops aggressive bots)
export const spinLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: {
        error: "You are spinning too fast! Take a breather."
    },
    standardHeaders: true,
    legacyHeaders: false,
});