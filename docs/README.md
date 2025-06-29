# 🕌 Website Ketaqwaan MAN 1 Jember - Dokumentasi Lengkap

## 📋 Daftar Isi
1. [Overview Proyek](#overview-proyek)
2. [Arsitektur Sistem](#arsitektur-sistem)
3. [Setup & Installation](#setup--installation)
4. [Struktur Folder](#struktur-folder)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Frontend Components](#frontend-components)
8. [Security Implementation](#security-implementation)
9. [Deployment Guide](#deployment-guide)
10. [Troubleshooting](#troubleshooting)
11. [Contributing Guidelines](#contributing-guidelines)

---

## 🎯 Overview Proyek

### Deskripsi
Website Ketaqwaan MAN 1 Jember adalah sistem manajemen konten untuk organisasi keagamaan sekolah yang terdiri dari:
- **Client Website**: Website publik untuk menampilkan informasi
- **Admin Panel**: Dashboard untuk mengelola konten website

### Tech Stack
```
Frontend (Client):     React + Vite + Tailwind CSS
Frontend (Admin):      React + Vite + Tailwind CSS  
Backend:               Node.js + Express.js
Database:              MongoDB
Image Storage:         Cloudinary
Authentication:        JWT + bcrypt
```

### Fitur Utama
- ✅ Manajemen Hero Section
- ✅ Struktur Organisasi
- ✅ Program Kerja
- ✅ Kegiatan PHBI
- ✅ Ekstrakurikuler
- ✅ Sistem Informasi
- ✅ Kotak Saran
- ✅ User Management
- ✅ Image Upload
- ✅ Role-based Access Control

---

## 🏗️ Arsitektur Sistem

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Web    │    │   Admin Panel   │    │   Mobile App    │
│   (React)       │    │   (React)       │    │   (Future)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   API Gateway   │
                    │   (Express.js)  │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Backend API   │
                    │   (Node.js)     │
                    └─────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    MongoDB      │    │   Cloudinary    │    │   File System   │
│   (Database)    │    │  (Images)       │    │   (Logs)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚀 Setup & Installation

### Prerequisites
```bash
Node.js >= 18.0.0
MongoDB >= 5.0
Git
```

### 1. Clone Repository
```bash
git clone https://github.com/your-repo/ketaqwaan-website.git
cd ketaqwaan-website
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install:all
```

### 3. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env

# Admin Frontend
cp admin-frontend/.env.example admin-frontend/.env

# Client Frontend
cp client-frontend/.env.example client-frontend/.env
```

### 4. Configure Environment Variables
Edit file `.env` sesuai dengan konfigurasi Anda:

```env
# Backend (.env)
MONGODB_URI=mongodb://localhost:27017/ketaqwaan
JWT_SECRET=your_jwt_secret_64_characters_minimum
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Database Setup
```bash
# Start MongoDB service
sudo systemctl start mongod

# Create default admin user
cd backend
node scripts/createDefaultAdmin.js
```

### 6. Start Development
```bash
# Start all services
npm run dev

# Or start individually
npm run dev:backend    # Backend only
npm run dev:frontend   # Admin panel only
```

### 7. Access Applications
- **Client Website**: http://localhost:3000
- **Admin Panel**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 📁 Struktur Folder

```
ketaqwaan-website/
├── 📁 backend/                 # Backend API
│   ├── 📁 config/             # Konfigurasi (DB, Cloudinary)
│   ├── 📁 middleware/         # Middleware (Auth, Security)
│   ├── 📁 models/             # MongoDB Models
│   ├── 📁 routes/             # API Routes
│   ├── 📁 scripts/            # Utility Scripts
│   ├── 📁 logs/               # Log Files
│   ├── 📄 server.js           # Entry Point
│   └── 📄 package.json
│
├── 📁 admin-frontend/         # Admin Panel
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable Components
│   │   ├── 📁 contexts/       # React Contexts
│   │   ├── 📁 hooks/          # Custom Hooks
│   │   ├── 📁 pages/          # Page Components
│   │   ├── 📁 services/       # API Services
│   │   └── 📄 main.jsx        # Entry Point
│   └── 📄 package.json
│
├── 📁 client-frontend/        # Client Website
│   ├── 📁 src/
│   │   ├── 📁 components/     # UI Components
│   │   ├── 📁 hooks/          # Custom Hooks
│   │   ├── 📁 pages/          # Page Components
│   │   ├── 📁 services/       # API Services
│   │   └── 📄 main.jsx        # Entry Point
│   └── 📄 package.json
│
├── 📁 docs/                   # Dokumentasi
│   ├── 📄 README.md           # Dokumentasi Utama
│   ├── 📄 API.md              # API Documentation
│   ├── 📄 DEPLOYMENT.md       # Deployment Guide
│   └── 📄 SECURITY.md         # Security Guide
│
└── 📄 package.json            # Root Package
```

---

## 🔌 API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production:  https://your-domain.com/api
```

### Authentication
```javascript
// Headers untuk authenticated requests
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

### Endpoints Overview

#### 🔐 Authentication
```
POST   /auth/login              # Login user
GET    /auth/me                 # Get current user
PUT    /auth/change-password    # Change password
POST   /auth/register           # Register user (super admin only)
GET    /auth/users              # Get all users (super admin only)
PUT    /auth/users/:id/toggle-status  # Toggle user status
```

#### 🏠 Hero Section
```
GET    /hero                    # Get hero section data
POST   /hero                    # Create hero section (admin)
PUT    /hero/:id                # Update hero section (admin)
POST   /hero/upload-image       # Upload hero image (admin)
```

#### 👥 Structure Section
```
GET    /struktur                # Get structure data
POST   /struktur                # Create structure (admin)
PUT    /struktur/:id            # Update structure (admin)
```

#### 📋 Program Kerja
```
GET    /program-kerja           # Get program kerja data
POST   /program-kerja           # Create program kerja (admin)
PUT    /program-kerja/:id       # Update program kerja (admin)
```

#### 📅 Kegiatan
```
GET    /kegiatan                # Get kegiatan data
POST   /kegiatan                # Create kegiatan (admin)
PUT    /kegiatan/:id            # Update kegiatan (admin)
POST   /kegiatan/upload-image   # Upload kegiatan image (admin)
```

#### 🎓 Ekstrakurikuler
```
GET    /ekskul                  # Get ekskul data
POST   /ekskul                  # Create ekskul (admin)
PUT    /ekskul/:id              # Update ekskul (admin)
POST   /ekskul/upload-image     # Upload ekskul image (admin)
```

#### ⚙️ Settings
```
GET    /navbar                  # Get navbar settings
PUT    /navbar                  # Update navbar settings (admin)
GET    /footer                  # Get footer settings
PUT    /footer                  # Update footer settings (admin)
GET    /informasi               # Get informasi settings
PUT    /informasi               # Update informasi settings (admin)
GET    /saran                   # Get saran settings
PUT    /saran                   # Update saran settings (admin)
```

### Request/Response Examples

#### Login Request
```javascript
POST /api/auth/login
{
  "email": "admin@ketaqwaan.com",
  "password": "admin123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "admin@ketaqwaan.com",
    "name": "Super Administrator",
    "role": "super_admin",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Update Hero Section
```javascript
PUT /api/hero/64f8a1b2c3d4e5f6a7b8c9d0
{
  "HeroWelcomeText": "Selamat Datang di",
  "HeroPrimaryText": "SIE 1 KETAQWAAN",
  "HeroSecondaryText": "MAN 1 JEMBER",
  "HeroDescription": "Membentuk Generasi Berakhlak dan Bertaqwa",
  "HeroLogoSie1": "https://res.cloudinary.com/...",
  "HeroInforSie1": [
    {
      "HeroTotalProker": 20,
      "HeroDeskripsiProker": "Program Kerja"
    }
  ]
}
```

---

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  role: String (enum: ['admin', 'super_admin']),
  isActive: Boolean (default: true),
  lastLogin: Date,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### HeroSection Collection
```javascript
{
  _id: ObjectId,
  HeroLogoSie1: String (Cloudinary URL),
  HeroDeskripsiLogoSie1: String,
  HeroWelcomeText: String,
  HeroPrimaryText: String,
  HeroSecondaryText: String,
  HeroDescription: String,
  HeroInforSie1: [{
    HeroTotalProker: Number,
    HeroDeskripsiProker: String,
    HeroTotalEkskul: Number,
    HeroDeskripsiEkskul: String,
    HeroTotalAnggota: Number,
    HeroDeskripsiAnggota: String
  }],
  cta: [{
    text: String,
    link: String,
    icon: String,
    type: String
  }],
  slides: [{
    id: Number,
    image: String (Cloudinary URL),
    title: String,
    description: String
  }],
  isActive: Boolean (default: true),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### StructureSection Collection
```javascript
{
  _id: ObjectId,
  Judul: String,
  JudulDeskripsi: String,
  JudulPengurus: String,
  TahunKepengurusan: String,
  BaganStukturKorbid: String,
  BaganStukturKetua: String,
  BaganStukturSekretaris: String,
  BaganStukturBendahara: String,
  members: [String],
  isActive: Boolean (default: true),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### ProgramKerja Collection
```javascript
{
  _id: ObjectId,
  ProgramKerjaJudul: String,
  ProgramKerjaDeskripsi: String,
  programs: [{
    icon: String,
    title: String,
    description: String,
    date: String,
    status: String (enum: ['Selesai', 'Sedang-Berlangsung', 'Direncanakan'])
  }],
  isActive: Boolean (default: true),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Kegiatan Collection
```javascript
{
  _id: ObjectId,
  KegiatanJudul: String,
  KegiatanDeskripsi: String,
  KegiatanSlide: [{
    title: String,
    description: String,
    image: String (Cloudinary URL),
    date: String
  }],
  isActive: Boolean (default: true),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Ekskul Collection
```javascript
{
  _id: ObjectId,
  EkskulJudul: String,
  EkskulDeskripsi: String,
  EkskulSlide: [{
    title: String,
    description: String,
    image: String (Cloudinary URL),
    schedule: {
      day: String,
      time: String
    }
  }],
  isActive: Boolean (default: true),
  updatedBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 Frontend Components

### Admin Panel Components

#### Layout Components
```javascript
// Layout.jsx - Main layout wrapper
<Layout>
  <Sidebar />
  <Header />
  <main>
    <Outlet /> // Page content
  </main>
</Layout>

// Sidebar.jsx - Navigation sidebar
<Sidebar>
  <NavLink to="/dashboard">Dashboard</NavLink>
  <NavLink to="/hero-section">Hero Section</NavLink>
  // ... other nav items
</Sidebar>

// Header.jsx - Top header with user info
<Header>
  <SearchBar />
  <NotificationBell />
  <UserProfile />
</Header>
```

#### Form Components
```javascript
// ImageUpload.jsx - Drag & drop image upload
<ImageUpload
  onUpload={handleUpload}
  currentImage={imageUrl}
  onRemove={handleRemove}
  maxSize={5 * 1024 * 1024} // 5MB
/>

// LoadingSpinner.jsx - Loading indicator
<LoadingSpinner size="lg" text="Loading..." />
```

#### Page Components
```javascript
// Dashboard.jsx - Main dashboard
<Dashboard>
  <StatsGrid />
  <RecentActivity />
  <QuickActions />
  <SystemStatus />
</Dashboard>

// HeroSection.jsx - Hero section management
<HeroSection>
  <BasicInformation />
  <Statistics />
  <CTAButtons />
  <ImageSlides />
</HeroSection>
```

### Client Website Components

#### Section Components
```javascript
// HeroSection.jsx - Hero section display
<HeroSection>
  <HeroContent />
  <HeroCarousel />
  <WaveBottom />
</HeroSection>

// StructureSection.jsx - Organization structure
<StructureSection>
  <TabNavigation />
  <OrganizationChart />
  <MembersList />
</StructureSection>

// ProgramKerjaSection.jsx - Work programs
<ProgramKerjaSection>
  <ProgramHeader />
  <ProgramCarousel />
</ProgramKerjaSection>
```

#### UI Components
```javascript
// Navbar.jsx - Navigation bar
<Navbar>
  <Brand />
  <DesktopMenu />
  <MobileMenuButton />
  <MobileMenu />
</Navbar>

// Footer.jsx - Website footer
<Footer>
  <AboutSection />
  <QuickLinks />
  <ContactInfo />
  <SocialMedia />
</Footer>
```

### Custom Hooks

#### useApi Hook
```javascript
// hooks/useApi.js
const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch };
};

// Usage
const { data: heroData, loading, error } = useApi(apiService.getHeroSection);
```

#### useAuth Hook
```javascript
// contexts/AuthContext.jsx
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Usage
const { user, login, logout, changePassword } = useAuth();
```

---

## 🔒 Security Implementation

### Authentication & Authorization
```javascript
// JWT Token Management
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { 
    expiresIn: '7d' 
  });
};

// Role-based Access Control
const adminAuth = async (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
```

### Input Validation
```javascript
// express-validator usage
const validateHeroSection = [
  body('HeroWelcomeText').trim().notEmpty(),
  body('HeroPrimaryText').trim().notEmpty(),
  body('HeroSecondaryText').trim().notEmpty(),
  body('HeroDescription').trim().notEmpty()
];
```

### Security Middleware
```javascript
// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL, process.env.ADMIN_URL]
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

### File Upload Security
```javascript
// Cloudinary Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ketaqwaan',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 1200, height: 800, crop: 'limit', quality: 'auto' }
    ]
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});
```

---

## 🚀 Deployment Guide

### Production Environment Setup

#### 1. Server Requirements
```bash
# Minimum Requirements
CPU: 2 cores
RAM: 4GB
Storage: 50GB SSD
OS: Ubuntu 20.04 LTS or CentOS 8
```

#### 2. Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Install Nginx
sudo apt install nginx -y

# Install PM2
sudo npm install -g pm2
```

#### 3. Application Deployment
```bash
# Clone repository
git clone https://github.com/your-repo/ketaqwaan-website.git
cd ketaqwaan-website

# Install dependencies
npm run install:all

# Build frontend applications
cd admin-frontend && npm run build
cd ../client-frontend && npm run build

# Setup environment variables
cp backend/.env.example backend/.env
# Edit .env with production values

# Start application with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Nginx Configuration
```nginx
# /etc/nginx/sites-available/ketaqwaan
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Client Website
    location / {
        root /path/to/client-frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Admin Panel
    location /admin {
        alias /path/to/admin-frontend/dist;
        try_files $uri $uri/ /admin/index.html;
    }
    
    # API
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
    }
}
```

#### 5. SSL Certificate
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### 6. PM2 Ecosystem Configuration
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
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
```

### Docker Deployment (Alternative)

#### Dockerfile
```dockerfile
# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ketaqwaan
    depends_on:
      - mongo
    volumes:
      - ./logs:/app/logs

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - backend

volumes:
  mongo_data:
```

---

## 🔧 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```bash
# Error: MongoNetworkError: failed to connect to server
# Solution:
sudo systemctl start mongod
sudo systemctl enable mongod

# Check MongoDB status
sudo systemctl status mongod
```

#### 2. Cloudinary Upload Error
```javascript
// Error: Invalid API credentials
// Solution: Check environment variables
console.log({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET'
});
```

#### 3. JWT Token Error
```javascript
// Error: JsonWebTokenError: invalid token
// Solution: Check token format and secret
const token = req.header('Authorization')?.replace('Bearer ', '');
if (!token) {
  return res.status(401).json({ message: 'No token provided' });
}
```

#### 4. CORS Error
```javascript
// Error: Access to fetch blocked by CORS policy
// Solution: Update CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

#### 5. File Upload Size Error
```javascript
// Error: File too large
// Solution: Increase limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

### Debug Commands
```bash
# Check application logs
pm2 logs ketaqwaan-backend

# Monitor application
pm2 monit

# Restart application
pm2 restart ketaqwaan-backend

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## 🤝 Contributing Guidelines

### Development Workflow

#### 1. Branch Strategy
```bash
main          # Production branch
develop       # Development branch
feature/*     # Feature branches
hotfix/*      # Hotfix branches
```

#### 2. Commit Convention
```bash
feat: add new hero section management
fix: resolve image upload issue
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for auth middleware
```

#### 3. Pull Request Process
1. Create feature branch from `develop`
2. Make changes and commit with conventional format
3. Write/update tests if applicable
4. Update documentation if needed
5. Create pull request to `develop`
6. Code review and approval
7. Merge to `develop`

#### 4. Code Standards
```javascript
// Use ESLint and Prettier
npm run lint
npm run format

// Follow naming conventions
// Components: PascalCase
// Functions: camelCase
// Constants: UPPER_SNAKE_CASE
// Files: kebab-case or PascalCase for components
```

### Testing Guidelines

#### Backend Testing
```javascript
// Example test structure
describe('Auth API', () => {
  describe('POST /auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@ketaqwaan.com',
          password: 'admin123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });
});
```

#### Frontend Testing
```javascript
// Example component test
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

test('renders hero section with title', () => {
  render(<HeroSection />);
  const titleElement = screen.getByText(/SIE 1 KETAQWAAN/i);
  expect(titleElement).toBeInTheDocument();
});
```

### Performance Guidelines

#### Backend Optimization
```javascript
// Use compression
app.use(compression());

// Implement caching
const cache = new Map();
app.get('/api/hero', (req, res) => {
  const cached = cache.get('hero');
  if (cached) {
    return res.json(cached);
  }
  // ... fetch from database
});

// Database indexing
db.users.createIndex({ email: 1 });
db.heroSection.createIndex({ isActive: 1 });
```

#### Frontend Optimization
```javascript
// Lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Image optimization
<img 
  src={imageUrl} 
  alt={title}
  loading="lazy"
  style={{ objectFit: 'cover' }}
/>

// API caching
const { data, loading, error } = useApi(
  apiService.getHeroSection,
  [], // dependencies
  { cache: true, cacheTime: 5 * 60 * 1000 } // 5 minutes
);
```

---

## 📞 Support & Contact

### Development Team
- **Lead Developer**: [Your Name]
- **Backend Developer**: [Backend Dev Name]
- **Frontend Developer**: [Frontend Dev Name]
- **UI/UX Designer**: [Designer Name]

### Support Channels
- **Email**: support@ketaqwaan.com
- **GitHub Issues**: [Repository Issues URL]
- **Documentation**: [Documentation URL]

### Version History
- **v1.0.0** - Initial release with basic CMS functionality
- **v1.1.0** - Added user management and enhanced security
- **v1.2.0** - Improved UI/UX and performance optimizations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**© 2024 SIE 1 KETAQWAAN MAN 1 JEMBER. All rights reserved.**