# 🕌 Website Ketaqwaan MAN 1 Jember

<div align="center">

![Ketaqwaan Logo](https://via.placeholder.com/200x200/136f63/ffffff?text=KETAQWAAN)

**Sistem Manajemen Konten untuk SIE 1 KETAQWAAN MAN 1 Jember**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.2.0-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-5.0+-green)](https://www.mongodb.com/)

[Demo](https://ketaqwaan-demo.vercel.app) • [Dokumentasi](./docs/README.md) • [API Docs](./docs/API.md) • [Deployment](./docs/DEPLOYMENT.md)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Struktur Proyek](#-struktur-proyek)
- [Dokumentasi](#-dokumentasi)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Tentang Proyek

Website Ketaqwaan MAN 1 Jember adalah sistem manajemen konten (CMS) yang dirancang khusus untuk organisasi keagamaan sekolah. Proyek ini terdiri dari dua aplikasi utama:

- **🌐 Website Publik**: Menampilkan informasi organisasi, program kerja, kegiatan, dan ekstrakurikuler
- **⚙️ Admin Panel**: Dashboard untuk mengelola konten website secara real-time

### Tujuan Proyek
- Menyediakan platform digital untuk SIE 1 KETAQWAAN MAN 1 Jember
- Memudahkan pengelolaan konten dan informasi organisasi
- Meningkatkan transparansi dan komunikasi dengan siswa dan masyarakat
- Menyediakan sistem yang aman, scalable, dan mudah digunakan

---

## ✨ Fitur Utama

### 🌟 Website Publik
- **Hero Section**: Tampilan utama dengan informasi organisasi dan statistik
- **Struktur Organisasi**: Bagan dan daftar pengurus dengan role masing-masing
- **Program Kerja**: Showcase program-program yang telah dan akan dilaksanakan
- **Kegiatan PHBI**: Galeri kegiatan Peringatan Hari Besar Islam
- **Ekstrakurikuler**: Informasi lengkap tentang ekskul yang dibawahi
- **Sistem Informasi**: Pengumuman dan informasi penting
- **Kotak Saran**: Platform untuk menerima masukan dari masyarakat

### 🛠️ Admin Panel
- **Dashboard Analytics**: Statistik dan overview sistem
- **User Management**: Kelola admin dan super admin
- **Content Management**: Edit semua konten website secara real-time
- **Image Upload**: Upload dan kelola gambar dengan Cloudinary
- **Role-based Access**: Sistem permission berdasarkan role user
- **Audit Logging**: Track semua aktivitas admin
- **Responsive Design**: Interface yang mobile-friendly

### 🔒 Keamanan
- **JWT Authentication**: Sistem autentikasi yang aman
- **Password Hashing**: bcrypt dengan salt rounds 12
- **Input Validation**: Validasi dan sanitasi semua input
- **Rate Limiting**: Perlindungan dari abuse dan DDoS
- **XSS Protection**: Perlindungan dari Cross-Site Scripting
- **CORS Configuration**: Konfigurasi CORS yang aman
- **File Upload Security**: Validasi tipe dan ukuran file

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Library UI modern dengan hooks
- **Vite** - Build tool yang cepat dan efisien
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client untuk API calls
- **React Hook Form** - Form handling yang performant
- **Swiper.js** - Modern slider/carousel
- **Lucide React** - Icon library yang konsisten

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework yang minimalis
- **MongoDB** - NoSQL database yang scalable
- **Mongoose** - ODM untuk MongoDB
- **JWT** - JSON Web Tokens untuk authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Cloud storage untuk gambar
- **express-validator** - Input validation middleware
- **Helmet.js** - Security headers

### DevOps & Tools
- **PM2** - Process manager untuk production
- **Nginx** - Web server dan reverse proxy
- **Docker** - Containerization (optional)
- **GitHub Actions** - CI/CD pipeline
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🚀 Quick Start

### Prerequisites
Pastikan Anda memiliki software berikut:
- **Node.js** >= 18.0.0
- **MongoDB** >= 5.0
- **Git**
- **npm** atau **yarn**

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/your-username/ketaqwaan-website.git
   cd ketaqwaan-website
   ```

2. **Install dependencies**
   ```bash
   # Install semua dependencies
   npm run install:all
   
   # Atau install satu per satu
   npm install                    # Root dependencies
   cd backend && npm install      # Backend dependencies
   cd ../admin-frontend && npm install  # Admin frontend
   cd ../client-frontend && npm install # Client frontend
   ```

3. **Setup environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   
   # Admin Frontend
   cp admin-frontend/.env.example admin-frontend/.env
   
   # Client Frontend
   cp client-frontend/.env.example client-frontend/.env
   ```

4. **Configure environment variables**
   
   Edit `backend/.env`:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/ketaqwaan
   
   # JWT Secret (generate dengan: openssl rand -hex 64)
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # Cloudinary (daftar di cloudinary.com)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # URLs
   CLIENT_URL=http://localhost:3000
   ADMIN_URL=http://localhost:5173
   ```

5. **Setup database**
   ```bash
   # Start MongoDB (jika menggunakan local MongoDB)
   sudo systemctl start mongod
   
   # Create default admin user
   cd backend
   node scripts/createDefaultAdmin.js
   ```

6. **Start development servers**
   ```bash
   # Start semua services
   npm run dev
   
   # Atau start individual
   npm run dev:backend    # Backend API (port 5000)
   npm run dev:frontend   # Admin panel (port 5173)
   ```

7. **Access applications**
   - **Client Website**: http://localhost:3000
   - **Admin Panel**: http://localhost:5173
   - **Backend API**: http://localhost:5000

### Default Login
```
Email: admin@ketaqwaan.com
Password: admin123
```

> ⚠️ **Penting**: Ganti password default setelah login pertama!

---

## 📁 Struktur Proyek

```
ketaqwaan-website/
├── 📁 backend/                 # Backend API (Node.js + Express)
│   ├── 📁 config/             # Konfigurasi database & services
│   ├── 📁 middleware/         # Express middleware
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 routes/             # API endpoints
│   ├── 📁 scripts/            # Utility scripts
│   └── 📄 server.js           # Entry point backend
│
├── 📁 admin-frontend/         # Admin Panel (React + Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable components
│   │   ├── 📁 contexts/       # React contexts
│   │   ├── 📁 hooks/          # Custom hooks
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 services/       # API services
│   │   └── 📄 main.jsx        # Entry point admin
│   └── 📄 package.json
│
├── 📁 client-frontend/        # Client Website (React + Vite)
│   ├── 📁 src/
│   │   ├── 📁 components/     # UI components
│   │   ├── 📁 hooks/          # Custom hooks
│   │   ├── 📁 pages/          # Page components
│   │   ├── 📁 services/       # API services
│   │   └── 📄 main.jsx        # Entry point client
│   └── 📄 package.json
│
├── 📁 docs/                   # Dokumentasi lengkap
│   ├── 📄 README.md           # Dokumentasi utama
│   ├── 📄 API.md              # API documentation
│   ├── 📄 DEPLOYMENT.md       # Deployment guide
│   ├── 📄 SECURITY.md         # Security guide
│   └── 📄 CONTRIBUTING.md     # Contributing guidelines
│
├── 📄 package.json            # Root package configuration
├── 📄 CHANGELOG.md            # Version history
└── 📄 README.md               # File ini
```

---

## 📚 Dokumentasi

### 📖 Dokumentasi Lengkap
- **[Dokumentasi Utama](./docs/README.md)** - Overview lengkap proyek
- **[API Documentation](./docs/API.md)** - Dokumentasi endpoint API
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Panduan deployment production
- **[Security Guide](./docs/SECURITY.md)** - Panduan keamanan
- **[Contributing Guide](./docs/CONTRIBUTING.md)** - Panduan kontribusi

### 🔗 Quick Links
- **[Database Schema](./docs/README.md#database-schema)** - Struktur database
- **[API Endpoints](./docs/API.md#endpoints-overview)** - Daftar API endpoints
- **[Environment Setup](./docs/DEPLOYMENT.md#environment-setup)** - Setup environment
- **[Security Features](./docs/SECURITY.md#security-overview)** - Fitur keamanan

### 📱 Screenshots

<details>
<summary>🖼️ Lihat Screenshots</summary>

#### Admin Panel
![Admin Dashboard](https://via.placeholder.com/800x400/136f63/ffffff?text=Admin+Dashboard)
*Dashboard admin dengan statistik dan overview*

![Content Management](https://via.placeholder.com/800x400/136f63/ffffff?text=Content+Management)
*Interface pengelolaan konten*

#### Client Website
![Hero Section](https://via.placeholder.com/800x400/136f63/ffffff?text=Hero+Section)
*Hero section dengan informasi organisasi*

![Program Kerja](https://via.placeholder.com/800x400/136f63/ffffff?text=Program+Kerja)
*Showcase program kerja organisasi*

</details>

---

## 🤝 Contributing

Kami sangat menghargai kontribusi dari komunitas! Berikut cara untuk berkontribusi:

### 🔄 Development Workflow
1. **Fork** repository ini
2. **Clone** fork Anda ke local
3. **Create** branch baru untuk fitur/fix
4. **Make** perubahan dan commit
5. **Push** ke fork Anda
6. **Create** Pull Request

### 📝 Contribution Guidelines
- Ikuti [Contributing Guide](./docs/CONTRIBUTING.md) untuk detail lengkap
- Gunakan [Conventional Commits](https://www.conventionalcommits.org/) untuk commit message
- Pastikan code mengikuti style guide yang ada
- Tulis tests untuk fitur baru
- Update dokumentasi jika diperlukan

### 🐛 Bug Reports
Laporkan bug melalui [GitHub Issues](https://github.com/your-repo/ketaqwaan-website/issues) dengan:
- Deskripsi bug yang jelas
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (jika applicable)
- Environment information

### 💡 Feature Requests
Ajukan fitur baru melalui [GitHub Issues](https://github.com/your-repo/ketaqwaan-website/issues) dengan label `enhancement`.

---

## 🚀 Deployment

### 🌐 Production Deployment
Lihat [Deployment Guide](./docs/DEPLOYMENT.md) untuk panduan lengkap deployment ke production.

### 🐳 Docker Deployment
```bash
# Build dan start dengan Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### ☁️ Cloud Deployment
- **Vercel**: Untuk frontend applications
- **Railway/Heroku**: Untuk backend API
- **MongoDB Atlas**: Untuk database cloud
- **Cloudinary**: Untuk image storage

---

## 📊 Roadmap

### 🎯 Version 1.1.0 (Q2 2024)
- [ ] Advanced analytics dashboard
- [ ] Email notification system
- [ ] Content versioning
- [ ] Advanced user permissions
- [ ] SEO optimization

### 🎯 Version 1.2.0 (Q3 2024)
- [ ] Real-time notifications
- [ ] Advanced search functionality
- [ ] Content scheduling
- [ ] Mobile app API
- [ ] Performance monitoring

### 🎯 Version 2.0.0 (Q4 2024)
- [ ] Complete UI/UX redesign
- [ ] Microservices architecture
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support
- [ ] Advanced security features

---

## 🏆 Contributors

Terima kasih kepada semua kontributor yang telah membantu pengembangan proyek ini:

<div align="center">

<!-- Contributors will be added here -->
<a href="https://github.com/your-repo/ketaqwaan-website/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/ketaqwaan-website" />
</a>

</div>

---

## 📄 License

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

```
MIT License

Copyright (c) 2024 SIE 1 KETAQWAAN MAN 1 JEMBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support & Contact

### 💬 Dukungan
- **GitHub Issues**: [Repository Issues](https://github.com/your-repo/ketaqwaan-website/issues)
- **Email**: support@ketaqwaan.com
- **Documentation**: [Project Docs](./docs/README.md)

### 🏢 Organisasi
**SIE 1 KETAQWAAN MAN 1 JEMBER**
- **Website**: https://ketaqwaan.man1jember.sch.id
- **Email**: ketaqwaan@man1jember.sch.id
- **Alamat**: Jl. Imam Bonjol No.50, Kaliwates, Jember, Jawa Timur

### 👥 Development Team
- **Project Lead**: [Your Name]
- **Backend Developer**: [Backend Dev Name]
- **Frontend Developer**: [Frontend Dev Name]
- **UI/UX Designer**: [Designer Name]

---

<div align="center">

**Dibuat dengan ❤️ oleh SIE 1 KETAQWAAN MAN 1 JEMBER**

[![GitHub stars](https://img.shields.io/github/stars/your-repo/ketaqwaan-website?style=social)](https://github.com/your-repo/ketaqwaan-website/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-repo/ketaqwaan-website?style=social)](https://github.com/your-repo/ketaqwaan-website/network/members)
[![GitHub issues](https://img.shields.io/github/issues/your-repo/ketaqwaan-website)](https://github.com/your-repo/ketaqwaan-website/issues)

</div>