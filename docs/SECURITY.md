# 🔒 Security Guide - Ketaqwaan Website

## 📋 Table of Contents
1. [Security Overview](#security-overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [Data Protection](#data-protection)
4. [Network Security](#network-security)
5. [Input Validation](#input-validation)
6. [File Upload Security](#file-upload-security)
7. [Database Security](#database-security)
8. [Monitoring & Logging](#monitoring--logging)
9. [Security Best Practices](#security-best-practices)
10. [Incident Response](#incident-response)
11. [Security Checklist](#security-checklist)

---

## 🛡️ Security Overview

### Security Architecture
```
┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   Admin Panel   │
│   (React)       │    │   (React)       │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┼───────────────────────┐
                                 │                       │
                    ┌─────────────────┐                  │
                    │   WAF/Firewall  │                  │
                    └─────────────────┘                  │
                                 │                       │
                    ┌─────────────────┐                  │
                    │   Load Balancer │                  │
                    │   (Nginx)       │                  │
                    └─────────────────┘                  │
                                 │                       │
                    ┌─────────────────┐                  │
                    │   API Gateway   │                  │
                    │   (Express.js)  │                  │
                    └─────────────────┘                  │
                                 │                       │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    MongoDB      │    │   Cloudinary    │    │   File System   │
│   (Encrypted)   │    │  (Secure API)   │    │   (Logs)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Security Layers
1. **Network Layer**: Firewall, DDoS protection, SSL/TLS
2. **Application Layer**: Authentication, authorization, input validation
3. **Data Layer**: Encryption, access controls, audit logging
4. **Infrastructure Layer**: Server hardening, monitoring, backups

---

## 🔐 Authentication & Authorization

### JWT Implementation
```javascript
// Token Generation
const generateToken = (userId) => {
  return jwt.sign(
    { 
      userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    },
    process.env.JWT_SECRET,
    { 
      algorithm: 'HS256',
      issuer: 'ketaqwaan-api',
      audience: 'ketaqwaan-client'
    }
  );
};

// Token Verification
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'ketaqwaan-api',
      audience: 'ketaqwaan-client'
    });
  } catch (error) {
    throw new Error('Invalid token');
  }
};
```

### Password Security
```javascript
// Password Hashing
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// Password Validation
const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && 
             hasLowerCase && hasNumbers && hasSpecialChar,
    errors: {
      length: password.length < minLength,
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      numbers: !hasNumbers,
      special: !hasSpecialChar
    }
  };
};
```

### Role-Based Access Control (RBAC)
```javascript
// Permission Matrix
const permissions = {
  super_admin: [
    'user:create', 'user:read', 'user:update', 'user:delete',
    'content:create', 'content:read', 'content:update', 'content:delete',
    'system:manage', 'logs:read'
  ],
  admin: [
    'content:create', 'content:read', 'content:update', 'content:delete'
  ]
};

// Permission Check Middleware
const checkPermission = (permission) => {
  return (req, res, next) => {
    const userPermissions = permissions[req.user.role] || [];
    
    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ 
        message: 'Insufficient permissions' 
      });
    }
    
    next();
  };
};

// Usage
app.post('/api/users', 
  auth, 
  checkPermission('user:create'), 
  createUser
);
```

### Session Management
```javascript
// Session Configuration
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 // lazy session update
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 30 * 60 * 1000, // 30 minutes
    sameSite: 'strict'
  }
}));
```

---

## 🔒 Data Protection

### Encryption at Rest
```javascript
// Data Encryption
const crypto = require('crypto');

const encrypt = (text) => {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

// Data Decryption
const decrypt = (encryptedData) => {
  const algorithm = 'aes-256-gcm';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const { encrypted, iv, authTag } = encryptedData;
  
  const decipher = crypto.createDecipher(
    algorithm, 
    key, 
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

### Sensitive Data Handling
```javascript
// PII Data Protection
const protectPII = (data) => {
  const sensitiveFields = ['email', 'phone', 'address'];
  const protected = { ...data };
  
  sensitiveFields.forEach(field => {
    if (protected[field]) {
      protected[field] = encrypt(protected[field]);
    }
  });
  
  return protected;
};

// Data Masking for Logs
const maskSensitiveData = (obj) => {
  const masked = { ...obj };
  const sensitiveKeys = ['password', 'token', 'secret', 'key'];
  
  Object.keys(masked).forEach(key => {
    if (sensitiveKeys.some(sensitive => 
        key.toLowerCase().includes(sensitive))) {
      masked[key] = '***MASKED***';
    }
  });
  
  return masked;
};
```

---

## 🌐 Network Security

### HTTPS Configuration
```nginx
# Nginx SSL Configuration
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL Security
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" always;
}
```

### Rate Limiting
```javascript
// Advanced Rate Limiting
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// General API Rate Limit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP',
    retryAfter: Math.round(15 * 60 * 1000 / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: 'Rate limit exceeded',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

// Login Rate Limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  skipSuccessfulRequests: true,
  message: {
    error: 'Too many login attempts, please try again later'
  }
});

// Speed Limiter
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // allow 2 requests per 15 minutes at full speed
  delayMs: 500 // add 500ms delay per request after delayAfter
});
```

### CORS Configuration
```javascript
// CORS Security
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://your-domain.com',
      'https://www.your-domain.com'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining']
};

app.use(cors(corsOptions));
```

---

## ✅ Input Validation

### Request Validation
```javascript
// Input Sanitization
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Sanitize data
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Clean user input from malicious HTML
app.use(hpp()); // Prevent HTTP Parameter Pollution

// Custom Validation Middleware
const { body, validationResult } = require('express-validator');

const validateHeroSection = [
  body('HeroWelcomeText')
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage('Welcome text must be 1-100 characters'),
  
  body('HeroPrimaryText')
    .trim()
    .isLength({ min: 1, max: 50 })
    .escape()
    .withMessage('Primary text must be 1-50 characters'),
  
  body('HeroDescription')
    .trim()
    .isLength({ min: 1, max: 500 })
    .escape()
    .withMessage('Description must be 1-500 characters'),
  
  body('HeroInforSie1.*.HeroTotalProker')
    .isInt({ min: 0, max: 1000 })
    .withMessage('Total proker must be a number between 0-1000'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];
```

### SQL/NoSQL Injection Prevention
```javascript
// MongoDB Query Sanitization
const sanitizeQuery = (query) => {
  const sanitized = {};
  
  Object.keys(query).forEach(key => {
    if (typeof query[key] === 'string') {
      // Remove potential injection patterns
      sanitized[key] = query[key]
        .replace(/[\$\{\}]/g, '') // Remove MongoDB operators
        .trim();
    } else if (typeof query[key] === 'object' && query[key] !== null) {
      sanitized[key] = sanitizeQuery(query[key]);
    } else {
      sanitized[key] = query[key];
    }
  });
  
  return sanitized;
};

// Safe Query Builder
const buildSafeQuery = (filters) => {
  const safeQuery = {};
  const allowedFields = ['name', 'email', 'role', 'isActive'];
  
  Object.keys(filters).forEach(key => {
    if (allowedFields.includes(key)) {
      safeQuery[key] = filters[key];
    }
  });
  
  return safeQuery;
};
```

---

## 📁 File Upload Security

### Secure File Upload
```javascript
// File Upload Security
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// File type validation
const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
];

const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  
  // Check file extension
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  
  if (!allowedExts.includes(ext)) {
    return cb(new Error('Invalid file extension'), false);
  }
  
  cb(null, true);
};

// Cloudinary configuration with security
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ketaqwaan',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 1200, height: 800, crop: 'limit', quality: 'auto' },
      { flags: 'strip_profile' } // Remove EXIF data
    ],
    public_id: (req, file) => {
      // Generate secure filename
      const timestamp = Date.now();
      const random = crypto.randomBytes(8).toString('hex');
      return `${timestamp}_${random}`;
    }
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file per request
  }
});

// File upload endpoint with security
app.post('/api/upload', 
  auth,
  adminAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ 
          message: 'No file uploaded' 
        });
      }
      
      // Log upload activity
      console.log(`File uploaded by ${req.user.email}: ${req.file.filename}`);
      
      res.json({
        message: 'File uploaded successfully',
        imageUrl: req.file.path,
        publicId: req.file.filename
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ 
        message: 'Upload failed' 
      });
    }
  }
);
```

### File Validation
```javascript
// Advanced file validation
const validateFile = (file) => {
  const errors = [];
  
  // Check file size
  if (file.size > 5 * 1024 * 1024) {
    errors.push('File size exceeds 5MB limit');
  }
  
  // Check dimensions (for images)
  if (file.mimetype.startsWith('image/')) {
    const sizeOf = require('image-size');
    const dimensions = sizeOf(file.buffer);
    
    if (dimensions.width > 4000 || dimensions.height > 4000) {
      errors.push('Image dimensions too large (max 4000x4000)');
    }
  }
  
  // Check for malicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i
  ];
  
  const fileContent = file.buffer.toString();
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(fileContent)) {
      errors.push('File contains suspicious content');
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

---

## 🗄️ Database Security

### MongoDB Security Configuration
```javascript
// Connection Security
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      ssl: process.env.NODE_ENV === 'production',
      sslValidate: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Query Security
const secureQuery = async (model, query, options = {}) => {
  try {
    // Sanitize query
    const sanitizedQuery = sanitizeQuery(query);
    
    // Add security filters
    const secureQuery = {
      ...sanitizedQuery,
      isActive: true // Only return active records
    };
    
    // Execute query with timeout
    const result = await model
      .find(secureQuery)
      .select(options.select || '-__v')
      .limit(options.limit || 100)
      .maxTimeMS(5000) // 5 second timeout
      .lean();
    
    return result;
  } catch (error) {
    console.error('Query error:', error);
    throw new Error('Database query failed');
  }
};
```

### Data Access Control
```javascript
// Row-level security
const addUserFilter = (req, query) => {
  // Non-super admins can only access their own data
  if (req.user.role !== 'super_admin') {
    query.createdBy = req.user._id;
  }
  
  return query;
};

// Secure model methods
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'super_admin'] },
  isActive: { type: Boolean, default: true }
});

// Remove sensitive data from JSON output
UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
};

// Audit trail
UserSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});
```

---

## 📊 Monitoring & Logging

### Security Logging
```javascript
// Security Event Logger
const winston = require('winston');

const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'ketaqwaan-security' },
  transports: [
    new winston.transports.File({ 
      filename: 'logs/security.log',
      maxsize: 10485760, // 10MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Security event types
const SECURITY_EVENTS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  UNAUTHORIZED_ACCESS: 'UNAUTHORIZED_ACCESS',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  SUSPICIOUS_ACTIVITY: 'SUSPICIOUS_ACTIVITY',
  DATA_BREACH_ATTEMPT: 'DATA_BREACH_ATTEMPT'
};

// Log security events
const logSecurityEvent = (event, req, details = {}) => {
  securityLogger.info({
    event,
    timestamp: new Date().toISOString(),
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get('User-Agent'),
    user: req.user?.email || 'anonymous',
    url: req.originalUrl,
    method: req.method,
    ...details
  });
};

// Usage in middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      logSecurityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, req);
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      logSecurityEvent(SECURITY_EVENTS.UNAUTHORIZED_ACCESS, req, {
        reason: 'Invalid or inactive user'
      });
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    req.user = user;
    logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS, req);
    next();
  } catch (error) {
    logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILURE, req, {
      error: error.message
    });
    res.status(401).json({ message: 'Token verification failed' });
  }
};
```

### Intrusion Detection
```javascript
// Suspicious Activity Detection
const suspiciousActivityDetector = {
  // Track failed login attempts
  failedAttempts: new Map(),
  
  // Track request patterns
  requestPatterns: new Map(),
  
  checkFailedLogins: (ip) => {
    const attempts = suspiciousActivityDetector.failedAttempts.get(ip) || 0;
    
    if (attempts >= 5) {
      return {
        suspicious: true,
        reason: 'Multiple failed login attempts',
        action: 'BLOCK_IP'
      };
    }
    
    return { suspicious: false };
  },
  
  checkRequestPattern: (ip, endpoint) => {
    const key = `${ip}:${endpoint}`;
    const requests = suspiciousActivityDetector.requestPatterns.get(key) || [];
    const now = Date.now();
    
    // Remove old requests (older than 1 minute)
    const recentRequests = requests.filter(time => now - time < 60000);
    
    if (recentRequests.length > 20) {
      return {
        suspicious: true,
        reason: 'High request frequency',
        action: 'RATE_LIMIT'
      };
    }
    
    // Update request history
    recentRequests.push(now);
    suspiciousActivityDetector.requestPatterns.set(key, recentRequests);
    
    return { suspicious: false };
  },
  
  recordFailedLogin: (ip) => {
    const attempts = suspiciousActivityDetector.failedAttempts.get(ip) || 0;
    suspiciousActivityDetector.failedAttempts.set(ip, attempts + 1);
    
    // Clear after 15 minutes
    setTimeout(() => {
      suspiciousActivityDetector.failedAttempts.delete(ip);
    }, 15 * 60 * 1000);
  }
};

// Middleware to detect suspicious activity
const detectSuspiciousActivity = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  
  // Check for suspicious patterns
  const loginCheck = suspiciousActivityDetector.checkFailedLogins(ip);
  const patternCheck = suspiciousActivityDetector.checkRequestPattern(ip, req.path);
  
  if (loginCheck.suspicious || patternCheck.suspicious) {
    const reason = loginCheck.reason || patternCheck.reason;
    
    logSecurityEvent(SECURITY_EVENTS.SUSPICIOUS_ACTIVITY, req, {
      reason,
      action: loginCheck.action || patternCheck.action
    });
    
    return res.status(429).json({
      message: 'Suspicious activity detected',
      reason
    });
  }
  
  next();
};
```

---

## 🛡️ Security Best Practices

### Environment Security
```bash
# .env Security Guidelines

# 1. Use strong, unique secrets
JWT_SECRET=$(openssl rand -hex 64)
ENCRYPTION_KEY=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -hex 32)

# 2. Restrict database access
MONGODB_URI=mongodb://app_user:strong_password@localhost:27017/ketaqwaan

# 3. Use secure Cloudinary settings
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 4. Limit admin access
ADMIN_IP_WHITELIST=192.168.1.100,10.0.0.50
ADMIN_EMAIL_WHITELIST=admin@company.com,superadmin@company.com

# 5. Set secure URLs
CLIENT_URL=https://your-domain.com
ADMIN_URL=https://admin.your-domain.com
```

### Code Security Guidelines
```javascript
// 1. Always validate input
const validateInput = (data, schema) => {
  // Use Joi or similar validation library
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }
  return value;
};

// 2. Use parameterized queries
const getUserById = async (id) => {
  // Good: Parameterized query
  return await User.findById(id);
  
  // Bad: String concatenation
  // return await User.find({ _id: id });
};

// 3. Implement proper error handling
const handleError = (error, req, res, next) => {
  // Log error details
  console.error('Error:', error);
  
  // Don't expose internal errors to client
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal server error' 
    : error.message;
  
  res.status(500).json({ message });
};

// 4. Use HTTPS everywhere
const enforceHTTPS = (req, res, next) => {
  if (process.env.NODE_ENV === 'production' && !req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
};

// 5. Implement Content Security Policy
const cspMiddleware = (req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:;"
  );
  next();
};
```

### Frontend Security
```javascript
// 1. Secure token storage
const TokenManager = {
  setToken: (token) => {
    // Use httpOnly cookies in production
    if (process.env.NODE_ENV === 'production') {
      // Set via secure API call
      fetch('/api/auth/set-token', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
    } else {
      localStorage.setItem('token', token);
    }
  },
  
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  removeToken: () => {
    localStorage.removeItem('token');
    // Also clear server-side cookie
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }
};

// 2. Input sanitization
const sanitizeInput = (input) => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 1000); // Limit length
};

// 3. Secure API calls
const secureApiCall = async (url, options = {}) => {
  const token = TokenManager.getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(url, config);
    
    if (response.status === 401) {
      TokenManager.removeToken();
      window.location.href = '/login';
      return;
    }
    
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
```

---

## 🚨 Incident Response

### Security Incident Response Plan

#### 1. Detection and Analysis
```javascript
// Automated threat detection
const threatDetector = {
  detectDataBreach: (req, res, next) => {
    // Monitor for unusual data access patterns
    const suspiciousPatterns = [
      /SELECT \* FROM/i,
      /UNION SELECT/i,
      /DROP TABLE/i,
      /INSERT INTO/i
    ];
    
    const requestBody = JSON.stringify(req.body);
    const hasSuspiciousPattern = suspiciousPatterns.some(pattern => 
      pattern.test(requestBody)
    );
    
    if (hasSuspiciousPattern) {
      logSecurityEvent(SECURITY_EVENTS.DATA_BREACH_ATTEMPT, req, {
        suspiciousContent: requestBody.substring(0, 200)
      });
      
      // Immediate response
      return res.status(403).json({
        message: 'Request blocked for security reasons'
      });
    }
    
    next();
  },
  
  detectBruteForce: (req, res, next) => {
    const ip = req.ip;
    const attempts = suspiciousActivityDetector.failedAttempts.get(ip) || 0;
    
    if (attempts >= 10) {
      // Trigger incident response
      triggerIncidentResponse('BRUTE_FORCE_ATTACK', {
        ip,
        attempts,
        endpoint: req.path
      });
    }
    
    next();
  }
};

// Incident response trigger
const triggerIncidentResponse = async (incidentType, details) => {
  // Log incident
  securityLogger.error({
    incident: incidentType,
    details,
    timestamp: new Date().toISOString(),
    severity: 'HIGH'
  });
  
  // Send alerts
  await sendSecurityAlert(incidentType, details);
  
  // Take automated actions
  await takeAutomatedAction(incidentType, details);
};
```

#### 2. Containment and Eradication
```javascript
// Automated containment actions
const takeAutomatedAction = async (incidentType, details) => {
  switch (incidentType) {
    case 'BRUTE_FORCE_ATTACK':
      // Block IP temporarily
      await blockIP(details.ip, '1 hour');
      break;
      
    case 'DATA_BREACH_ATTEMPT':
      // Increase monitoring
      await increaseMonitoring();
      // Notify administrators
      await notifyAdmins(incidentType, details);
      break;
      
    case 'SUSPICIOUS_ACTIVITY':
      // Rate limit user
      await rateLimitUser(details.user, '30 minutes');
      break;
  }
};

// IP blocking
const blockIP = async (ip, duration) => {
  // Add to blocked IPs list
  const blockedIPs = new Set();
  blockedIPs.add(ip);
  
  // Remove after duration
  setTimeout(() => {
    blockedIPs.delete(ip);
  }, parseDuration(duration));
  
  console.log(`IP ${ip} blocked for ${duration}`);
};

// Security alert system
const sendSecurityAlert = async (incidentType, details) => {
  const alertMessage = {
    type: incidentType,
    timestamp: new Date().toISOString(),
    details,
    severity: getSeverityLevel(incidentType)
  };
  
  // Send to monitoring system
  // await sendToMonitoringSystem(alertMessage);
  
  // Send email to security team
  // await sendEmailAlert(alertMessage);
  
  console.log('Security alert sent:', alertMessage);
};
```

#### 3. Recovery and Lessons Learned
```javascript
// Incident recovery procedures
const incidentRecovery = {
  restoreFromBackup: async (backupDate) => {
    console.log(`Restoring from backup: ${backupDate}`);
    // Implementation depends on backup strategy
  },
  
  resetUserPasswords: async (userIds) => {
    for (const userId of userIds) {
      const tempPassword = generateSecurePassword();
      await User.findByIdAndUpdate(userId, {
        password: await hashPassword(tempPassword),
        mustChangePassword: true
      });
      
      // Send new password to user via secure channel
      await sendPasswordResetEmail(userId, tempPassword);
    }
  },
  
  revokeAllTokens: async () => {
    // Increment JWT secret version to invalidate all tokens
    process.env.JWT_SECRET_VERSION = (parseInt(process.env.JWT_SECRET_VERSION) || 0) + 1;
    console.log('All JWT tokens revoked');
  }
};

// Post-incident analysis
const postIncidentAnalysis = {
  generateReport: (incident) => {
    return {
      incidentId: incident.id,
      type: incident.type,
      detectionTime: incident.detectionTime,
      responseTime: incident.responseTime,
      impact: incident.impact,
      rootCause: incident.rootCause,
      actionsToken: incident.actionsTaken,
      lessonsLearned: incident.less onsLearned,
      preventiveMeasures: incident.preventiveMeasures
    };
  },
  
  updateSecurityPolicies: (lessons) => {
    // Update security configurations based on lessons learned
    console.log('Updating security policies:', lessons);
  }
};
```

---

## ✅ Security Checklist

### Pre-Deployment Security Checklist

#### Authentication & Authorization
- [ ] Strong password policy implemented
- [ ] JWT tokens properly configured with expiration
- [ ] Role-based access control (RBAC) implemented
- [ ] Session management configured securely
- [ ] Multi-factor authentication considered

#### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] Data encrypted in transit (HTTPS)
- [ ] Database credentials secured
- [ ] Environment variables protected
- [ ] Backup encryption implemented

#### Input Validation
- [ ] All user inputs validated and sanitized
- [ ] SQL/NoSQL injection prevention implemented
- [ ] XSS protection enabled
- [ ] File upload restrictions in place
- [ ] Request size limits configured

#### Network Security
- [ ] HTTPS enforced
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Firewall rules configured

#### Monitoring & Logging
- [ ] Security event logging implemented
- [ ] Log rotation configured
- [ ] Monitoring alerts set up
- [ ] Incident response plan documented
- [ ] Regular security audits scheduled

#### Infrastructure Security
- [ ] Server hardening completed
- [ ] Database security configured
- [ ] Regular security updates scheduled
- [ ] Backup and recovery tested
- [ ] Access controls implemented

### Monthly Security Review

#### Code Review
- [ ] Review authentication mechanisms
- [ ] Check for hardcoded secrets
- [ ] Validate input sanitization
- [ ] Review error handling
- [ ] Check dependency vulnerabilities

#### Infrastructure Review
- [ ] Review server configurations
- [ ] Check SSL certificate expiration
- [ ] Review firewall rules
- [ ] Validate backup integrity
- [ ] Test disaster recovery procedures

#### Access Review
- [ ] Review user accounts and permissions
- [ ] Remove inactive accounts
- [ ] Validate admin access
- [ ] Check API key usage
- [ ] Review third-party integrations

### Security Metrics

#### Key Performance Indicators (KPIs)
```javascript
const securityMetrics = {
  // Authentication metrics
  loginSuccessRate: 0.95, // Target: >95%
  failedLoginAttempts: 50, // Target: <100/day
  passwordResetRequests: 5, // Target: <10/day
  
  // Security incident metrics
  securityIncidents: 0, // Target: 0/month
  falsePositives: 2, // Target: <5/month
  responseTime: 15, // Target: <30 minutes
  
  // System metrics
  uptimePercentage: 99.9, // Target: >99.5%
  backupSuccessRate: 1.0, // Target: 100%
  vulnerabilityCount: 0 // Target: 0 high/critical
};

// Generate security report
const generateSecurityReport = () => {
  return {
    period: 'Monthly',
    date: new Date().toISOString(),
    metrics: securityMetrics,
    incidents: getSecurityIncidents(),
    recommendations: getSecurityRecommendations(),
    nextReviewDate: getNextReviewDate()
  };
};
```

---

## 📞 Security Contact

### Security Team
- **Security Officer**: security@ketaqwaan.com
- **Emergency Contact**: +62-XXX-XXXX-XXXX
- **Incident Reporting**: incidents@ketaqwaan.com

### Vulnerability Disclosure
If you discover a security vulnerability, please:
1. **DO NOT** disclose it publicly
2. Send details to security@ketaqwaan.com
3. Include steps to reproduce the issue
4. Allow reasonable time for response and fix

### Security Resources
- **Security Policy**: [GitHub Security Policy](https://github.com/your-repo/security)
- **Bug Bounty**: Contact security team for details
- **Security Updates**: Subscribe to security@ketaqwaan.com

---

**© 2024 SIE 1 KETAQWAAN MAN 1 JEMBER. All rights reserved.**

*This security guide is a living document and should be updated regularly to reflect new threats and security best practices.*