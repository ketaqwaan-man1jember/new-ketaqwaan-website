const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

// Advanced Rate Limiting
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 account creation requests per windowMs
  message: 'Too many accounts created from this IP, please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Speed Limiter
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // Allow 2 requests per 15 minutes, then...
  delayMs: 500 // Begin adding 500ms of delay per request after delayAfter
});

// Security Middleware
const securityMiddleware = [
  // Data sanitization against NoSQL query injection
  mongoSanitize(),
  
  // Data sanitization against XSS
  xss(),
  
  // Speed limiting
  speedLimiter
];

// IP Whitelist for admin routes
const adminIPWhitelist = (req, res, next) => {
  const allowedIPs = process.env.ADMIN_IP_WHITELIST?.split(',') || [];
  const clientIP = req.ip || req.connection.remoteAddress;
  
  if (allowedIPs.length > 0 && !allowedIPs.includes(clientIP)) {
    return res.status(403).json({ 
      message: 'Access denied from this IP address' 
    });
  }
  
  next();
};

// Session timeout middleware
const sessionTimeout = (req, res, next) => {
  if (req.user && req.user.lastActivity) {
    const now = new Date();
    const lastActivity = new Date(req.user.lastActivity);
    const timeDiff = now - lastActivity;
    const timeoutDuration = 30 * 60 * 1000; // 30 minutes
    
    if (timeDiff > timeoutDuration) {
      return res.status(401).json({ 
        message: 'Session expired due to inactivity' 
      });
    }
  }
  
  next();
};

module.exports = {
  createAccountLimiter,
  loginLimiter,
  securityMiddleware,
  adminIPWhitelist,
  sessionTimeout
};