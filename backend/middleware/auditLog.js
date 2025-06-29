const fs = require('fs').promises;
const path = require('path');

// Audit logging middleware
const auditLog = (action) => {
  return (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log the action
      logAction({
        action,
        user: req.user?.email || 'anonymous',
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        success: res.statusCode < 400
      });
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

const logAction = async (logData) => {
  try {
    const logDir = path.join(__dirname, '../logs');
    const logFile = path.join(logDir, `audit-${new Date().toISOString().split('T')[0]}.log`);
    
    // Ensure logs directory exists
    try {
      await fs.access(logDir);
    } catch {
      await fs.mkdir(logDir, { recursive: true });
    }
    
    const logEntry = JSON.stringify(logData) + '\n';
    await fs.appendFile(logFile, logEntry);
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
};

module.exports = { auditLog };