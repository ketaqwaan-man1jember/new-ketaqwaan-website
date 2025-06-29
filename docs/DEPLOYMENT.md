# 🚀 Deployment Guide - Ketaqwaan Website

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Application Deployment](#application-deployment)
4. [Database Configuration](#database-configuration)
5. [Web Server Configuration](#web-server-configuration)
6. [SSL Certificate](#ssl-certificate)
7. [Process Management](#process-management)
8. [Monitoring & Logging](#monitoring--logging)
9. [Backup Strategy](#backup-strategy)
10. [Docker Deployment](#docker-deployment)
11. [CI/CD Pipeline](#cicd-pipeline)
12. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

### System Requirements
```bash
# Minimum Requirements
CPU: 2 cores (4 cores recommended)
RAM: 4GB (8GB recommended)
Storage: 50GB SSD (100GB recommended)
OS: Ubuntu 20.04 LTS / CentOS 8 / Amazon Linux 2

# Network Requirements
Bandwidth: 100 Mbps
Open Ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)
```

### Required Software
```bash
Node.js >= 18.0.0
MongoDB >= 5.0
Nginx >= 1.18
PM2 (Process Manager)
Git
Certbot (for SSL)
```

---

## 🖥️ Server Setup

### 1. Initial Server Configuration
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl wget git unzip software-properties-common

# Create application user
sudo adduser ketaqwaan
sudo usermod -aG sudo ketaqwaan

# Switch to application user
su - ketaqwaan
```

### 2. Install Node.js
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

### 3. Install MongoDB
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Update package list and install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB installation
sudo systemctl status mongod
```

### 4. Install Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check Nginx status
sudo systemctl status nginx
```

### 5. Install PM2
```bash
# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup script
pm2 startup
# Follow the instructions provided by the command
```

---

## 📦 Application Deployment

### 1. Clone Repository
```bash
# Navigate to application directory
cd /home/ketaqwaan

# Clone the repository
git clone https://github.com/your-username/ketaqwaan-website.git
cd ketaqwaan-website

# Set proper permissions
sudo chown -R ketaqwaan:ketaqwaan /home/ketaqwaan/ketaqwaan-website
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install admin frontend dependencies
cd ../admin-frontend
npm install

# Install client frontend dependencies
cd ../client-frontend
npm install

# Return to root directory
cd ..
```

### 3. Environment Configuration
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp admin-frontend/.env.example admin-frontend/.env
cp client-frontend/.env.example client-frontend/.env

# Edit backend environment file
nano backend/.env
```

**Backend Environment Configuration:**
```env
# Production Environment Variables
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/ketaqwaan

# JWT Secret (Generate with: openssl rand -hex 64)
JWT_SECRET=your_generated_jwt_secret_64_characters_minimum

# Encryption Key (Generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your_generated_encryption_key_32_characters

# Session Secret
SESSION_SECRET=your_generated_session_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# URLs
CLIENT_URL=https://your-domain.com
ADMIN_URL=https://your-domain.com/admin

# Security Settings
ADMIN_IP_WHITELIST=your_admin_ip_addresses
ADMIN_EMAIL_WHITELIST=admin@your-domain.com

# Default Admin Credentials
DEFAULT_ADMIN_EMAIL=admin@your-domain.com
DEFAULT_ADMIN_PASSWORD=secure_admin_password_change_immediately
```

**Frontend Environment Configuration:**
```env
# Admin Frontend (.env)
VITE_API_URL=https://your-domain.com/api

# Client Frontend (.env)
VITE_API_URL=https://your-domain.com/api
```

### 4. Build Frontend Applications
```bash
# Build admin frontend
cd admin-frontend
npm run build

# Build client frontend
cd ../client-frontend
npm run build

# Return to root
cd ..
```

### 5. Create Default Admin User
```bash
# Navigate to backend directory
cd backend

# Create default admin user
node scripts/createDefaultAdmin.js

# Return to root
cd ..
```

---

## 🗄️ Database Configuration

### 1. MongoDB Security Configuration
```bash
# Edit MongoDB configuration
sudo nano /etc/mongod.conf
```

**MongoDB Configuration:**
```yaml
# /etc/mongod.conf
storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1

security:
  authorization: enabled

processManagement:
  fork: true
  pidFilePath: /var/run/mongodb/mongod.pid
```

### 2. Create MongoDB Admin User
```bash
# Connect to MongoDB
mongo

# Switch to admin database
use admin

# Create admin user
db.createUser({
  user: "admin",
  pwd: "secure_password_here",
  roles: ["userAdminAnyDatabase", "dbAdminAnyDatabase", "readWriteAnyDatabase"]
})

# Exit MongoDB shell
exit

# Restart MongoDB
sudo systemctl restart mongod
```

### 3. Create Application Database User
```bash
# Connect with admin credentials
mongo -u admin -p

# Switch to application database
use ketaqwaan

# Create application user
db.createUser({
  user: "ketaqwaan_user",
  pwd: "secure_app_password",
  roles: ["readWrite"]
})

# Exit
exit
```

### 4. Update Database Connection String
```bash
# Update backend .env file
nano backend/.env

# Update MONGODB_URI
MONGODB_URI=mongodb://ketaqwaan_user:secure_app_password@localhost:27017/ketaqwaan
```

---

## 🌐 Web Server Configuration

### 1. Nginx Configuration
```bash
# Create Nginx configuration file
sudo nano /etc/nginx/sites-available/ketaqwaan
```

**Nginx Configuration:**
```nginx
# /etc/nginx/sites-available/ketaqwaan
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
    
    # Client Website (Root)
    location / {
        root /home/ketaqwaan/ketaqwaan-website/client-frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Admin Panel
    location /admin {
        alias /home/ketaqwaan/ketaqwaan-website/admin-frontend/dist;
        try_files $uri $uri/ /admin/index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API Proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Buffer settings
        proxy_buffering on;
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
    
    # Security: Block access to sensitive files
    location ~ /\. {
        deny all;
    }
    
    location ~ /(package\.json|package-lock\.json|\.env) {
        deny all;
    }
}
```

### 2. Enable Nginx Configuration
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ketaqwaan /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔒 SSL Certificate

### 1. Install Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate
```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts to configure SSL
```

### 3. Setup Auto-renewal
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Setup cron job for auto-renewal
sudo crontab -e

# Add the following line:
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 🔄 Process Management

### 1. PM2 Ecosystem Configuration
```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

**PM2 Configuration:**
```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'ketaqwaan-backend',
    script: './backend/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max_old_space_size=1024',
    watch: false,
    ignore_watch: ['node_modules', 'logs'],
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }],

  deploy: {
    production: {
      user: 'ketaqwaan',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'https://github.com/your-username/ketaqwaan-website.git',
      path: '/home/ketaqwaan/ketaqwaan-website',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
```

### 2. Start Application with PM2
```bash
# Create logs directory
mkdir -p logs

# Start application
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ketaqwaan --hp /home/ketaqwaan
```

### 3. PM2 Management Commands
```bash
# View application status
pm2 status

# View logs
pm2 logs ketaqwaan-backend

# Monitor application
pm2 monit

# Restart application
pm2 restart ketaqwaan-backend

# Stop application
pm2 stop ketaqwaan-backend

# Reload application (zero downtime)
pm2 reload ketaqwaan-backend
```

---

## 📊 Monitoring & Logging

### 1. Setup Log Rotation
```bash
# Create logrotate configuration
sudo nano /etc/logrotate.d/ketaqwaan
```

**Logrotate Configuration:**
```
/home/ketaqwaan/ketaqwaan-website/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 ketaqwaan ketaqwaan
    postrotate
        pm2 reloadLogs
    endscript
}
```

### 2. System Monitoring Script
```bash
# Create monitoring script
nano scripts/monitor.sh
```

**Monitoring Script:**
```bash
#!/bin/bash
# scripts/monitor.sh

# Check if application is running
if ! pm2 describe ketaqwaan-backend > /dev/null 2>&1; then
    echo "$(date): Application is down, restarting..." >> logs/monitor.log
    pm2 start ecosystem.config.js --env production
fi

# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$(date): Disk usage is ${DISK_USAGE}%" >> logs/monitor.log
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.2f", $3/$2 * 100.0)}')
if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
    echo "$(date): Memory usage is ${MEMORY_USAGE}%" >> logs/monitor.log
fi

# Check MongoDB status
if ! systemctl is-active --quiet mongod; then
    echo "$(date): MongoDB is down, restarting..." >> logs/monitor.log
    sudo systemctl start mongod
fi

# Check Nginx status
if ! systemctl is-active --quiet nginx; then
    echo "$(date): Nginx is down, restarting..." >> logs/monitor.log
    sudo systemctl start nginx
fi
```

### 3. Setup Monitoring Cron Job
```bash
# Make script executable
chmod +x scripts/monitor.sh

# Add to crontab
crontab -e

# Add monitoring job (runs every 5 minutes)
*/5 * * * * /home/ketaqwaan/ketaqwaan-website/scripts/monitor.sh
```

---

## 💾 Backup Strategy

### 1. Database Backup Script
```bash
# Create backup script
nano scripts/backup.sh
```

**Backup Script:**
```bash
#!/bin/bash
# scripts/backup.sh

# Configuration
BACKUP_DIR="/home/ketaqwaan/backups"
DB_NAME="ketaqwaan"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/mongodb_backup_$DATE.gz"
RETENTION_DAYS=30

# Create backup directory
mkdir -p $BACKUP_DIR

# Create MongoDB backup
mongodump --db $DB_NAME --gzip --archive=$BACKUP_FILE

# Create application backup
tar -czf "$BACKUP_DIR/app_backup_$DATE.tar.gz" \
    --exclude='node_modules' \
    --exclude='logs' \
    --exclude='backups' \
    /home/ketaqwaan/ketaqwaan-website

# Remove old backups
find $BACKUP_DIR -name "*.gz" -mtime +$RETENTION_DAYS -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +$RETENTION_DAYS -delete

echo "$(date): Backup completed - $BACKUP_FILE" >> logs/backup.log
```

### 2. Setup Backup Cron Job
```bash
# Make script executable
chmod +x scripts/backup.sh

# Add to crontab (daily backup at 2 AM)
crontab -e

# Add backup job
0 2 * * * /home/ketaqwaan/ketaqwaan-website/scripts/backup.sh
```

### 3. Restore Script
```bash
# Create restore script
nano scripts/restore.sh
```

**Restore Script:**
```bash
#!/bin/bash
# scripts/restore.sh

if [ $# -eq 0 ]; then
    echo "Usage: $0 <backup_file>"
    exit 1
fi

BACKUP_FILE=$1

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Restoring from: $BACKUP_FILE"
echo "This will overwrite the current database. Continue? (y/N)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    # Stop application
    pm2 stop ketaqwaan-backend
    
    # Restore database
    mongorestore --db ketaqwaan --gzip --archive=$BACKUP_FILE --drop
    
    # Start application
    pm2 start ketaqwaan-backend
    
    echo "Restore completed successfully"
else
    echo "Restore cancelled"
fi
```

---

## 🐳 Docker Deployment

### 1. Dockerfile for Backend
```dockerfile
# backend/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### 2. Docker Compose Configuration
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    container_name: ketaqwaan-backend
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ketaqwaan
      - JWT_SECRET=${JWT_SECRET}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
    depends_on:
      - mongo
    volumes:
      - ./logs:/app/logs
    networks:
      - ketaqwaan-network

  mongo:
    image: mongo:5.0
    container_name: ketaqwaan-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=${MONGO_ROOT_PASSWORD}
      - MONGO_INITDB_DATABASE=ketaqwaan
    volumes:
      - mongo_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - ketaqwaan-network

  nginx:
    image: nginx:alpine
    container_name: ketaqwaan-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./client-frontend/dist:/usr/share/nginx/html:ro
      - ./admin-frontend/dist:/usr/share/nginx/html/admin:ro
      - ./ssl:/etc/ssl:ro
    depends_on:
      - backend
    networks:
      - ketaqwaan-network

volumes:
  mongo_data:

networks:
  ketaqwaan-network:
    driver: bridge
```

### 3. Docker Environment File
```bash
# .env.docker
JWT_SECRET=your_jwt_secret_here
MONGO_ROOT_PASSWORD=your_mongo_root_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Deploy with Docker
```bash
# Build and start services
docker-compose --env-file .env.docker up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Update and restart
docker-compose pull
docker-compose up -d --force-recreate
```

---

## 🔄 CI/CD Pipeline

### 1. GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: |
        npm install
        cd backend && npm install
        cd ../admin-frontend && npm install
        cd ../client-frontend && npm install
    
    - name: Run tests
      run: |
        cd backend && npm test
    
    - name: Build frontend
      run: |
        cd admin-frontend && npm run build
        cd ../client-frontend && npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /home/ketaqwaan/ketaqwaan-website
          git pull origin main
          npm install
          cd admin-frontend && npm install && npm run build
          cd ../client-frontend && npm install && npm run build
          cd ../backend && npm install
          pm2 reload ecosystem.config.js --env production
```

### 2. Deployment Script
```bash
# scripts/deploy.sh
#!/bin/bash

echo "Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build frontend applications
cd admin-frontend
npm install
npm run build

cd ../client-frontend
npm install
npm run build

cd ../backend
npm install

# Restart application
pm2 reload ecosystem.config.js --env production

echo "Deployment completed successfully!"
```

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Application Won't Start
```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs ketaqwaan-backend

# Check environment variables
pm2 env 0

# Restart application
pm2 restart ketaqwaan-backend
```

#### 2. Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Test connection
mongo -u ketaqwaan_user -p

# Restart MongoDB
sudo systemctl restart mongod
```

#### 3. Nginx Issues
```bash
# Check Nginx status
sudo systemctl status nginx

# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log

# Restart Nginx
sudo systemctl restart nginx
```

#### 4. SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

#### 5. High Memory Usage
```bash
# Check memory usage
free -h

# Check PM2 memory usage
pm2 monit

# Restart application to free memory
pm2 restart ketaqwaan-backend
```

### Performance Optimization

#### 1. Enable Gzip Compression
Already configured in Nginx configuration above.

#### 2. Optimize Database
```bash
# Connect to MongoDB
mongo -u admin -p

# Create indexes
use ketaqwaan
db.users.createIndex({ email: 1 })
db.herosections.createIndex({ isActive: 1 })
db.programkerjas.createIndex({ isActive: 1 })
```

#### 3. Monitor Performance
```bash
# Install htop for system monitoring
sudo apt install htop

# Monitor system resources
htop

# Monitor disk usage
df -h

# Monitor network usage
sudo apt install iftop
sudo iftop
```

---

## 📞 Support

For deployment issues or questions:
- **Email**: support@ketaqwaan.com
- **Documentation**: [GitHub Repository](https://github.com/your-username/ketaqwaan-website)
- **Issues**: [GitHub Issues](https://github.com/your-username/ketaqwaan-website/issues)

---

**© 2024 SIE 1 KETAQWAAN MAN 1 JEMBER. All rights reserved.**