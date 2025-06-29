const crypto = require('crypto');

const algorithm = 'aes-256-gcm';
const secretKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);

// Encrypt sensitive data
const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipher(algorithm, secretKey, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return {
    encrypted,
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex')
  };
};

// Decrypt sensitive data
const decrypt = (encryptedData) => {
  const { encrypted, iv, authTag } = encryptedData;
  
  const decipher = crypto.createDecipher(algorithm, secretKey, Buffer.from(iv, 'hex'));
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Hash sensitive data (one-way)
const hashData = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

module.exports = { encrypt, decrypt, hashData };