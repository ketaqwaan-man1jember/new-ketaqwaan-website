# 🔌 API Documentation - Ketaqwaan Website

## Base Information

**Base URL**: `http://localhost:5000/api` (Development)  
**Production URL**: `https://your-domain.com/api`  
**API Version**: v1  
**Authentication**: JWT Bearer Token  

## Authentication

### Headers
```javascript
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

### Error Responses
```javascript
// 401 Unauthorized
{
  "message": "No token, authorization denied"
}

// 403 Forbidden
{
  "message": "Access denied. Admin role required."
}

// 400 Bad Request
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

---

## 🔐 Authentication Endpoints

### POST /auth/login
Login user and get JWT token.

**Request Body:**
```javascript
{
  "email": "admin@ketaqwaan.com",
  "password": "admin123"
}
```

**Response (200):**
```javascript
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

### GET /auth/me
Get current authenticated user information.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```javascript
{
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "admin@ketaqwaan.com",
    "name": "Super Administrator",
    "role": "super_admin",
    "lastLogin": "2024-01-15T10:30:00.000Z"
  }
}
```

### PUT /auth/change-password
Change user password.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response (200):**
```javascript
{
  "message": "Password updated successfully"
}
```

### POST /auth/register
Register new admin user (Super Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "email": "newadmin@ketaqwaan.com",
  "password": "password123",
  "name": "New Administrator",
  "role": "admin"
}
```

**Response (201):**
```javascript
{
  "message": "User created successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "email": "newadmin@ketaqwaan.com",
    "name": "New Administrator",
    "role": "admin"
  }
}
```

### GET /auth/users
Get all users (Super Admin only).

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```javascript
[
  {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "admin@ketaqwaan.com",
    "name": "Super Administrator",
    "role": "super_admin",
    "isActive": true,
    "lastLogin": "2024-01-15T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### PUT /auth/users/:id/toggle-status
Toggle user active status (Super Admin only).

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```javascript
{
  "message": "User activated successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "email": "admin@ketaqwaan.com",
    "name": "Administrator",
    "role": "admin",
    "isActive": true
  }
}
```

---

## 🏠 Hero Section Endpoints

### GET /hero
Get hero section data (Public).

**Response (200):**
```javascript
{
  "heroSection": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "HeroLogoSie1": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/logo.png",
    "HeroDeskripsiLogoSie1": "Logo SIE 1 Ketaqwaan MAN 1 Jember",
    "HeroWelcomeText": "Selamat Datang di",
    "HeroPrimaryText": "SIE 1 KETAQWAAN",
    "HeroSecondaryText": "MAN 1 JEMBER",
    "HeroDescription": "Membentuk Generasi Berakhlak dan Bertaqwa",
    "HeroInforSie1": [
      {
        "HeroTotalProker": 20,
        "HeroDeskripsiProker": "Program Kerja"
      },
      {
        "HeroTotalEkskul": 3,
        "HeroDeskripsiEkskul": "Ekstrakurikuler"
      },
      {
        "HeroTotalAnggota": 100,
        "HeroDeskripsiAnggota": "Anggota"
      }
    ],
    "cta": [
      {
        "text": "Program Kerja",
        "link": "#proker",
        "icon": "fas fa-arrow-right",
        "type": "primary"
      }
    ],
    "slides": [
      {
        "id": 1,
        "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/slide1.jpg",
        "title": "Anggota SIE 1 Ketaqwaan",
        "description": "Tim yang berdedikasi untuk membentuk karakter islami"
      }
    ],
    "isActive": true,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /hero
Create new hero section (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "HeroWelcomeText": "Selamat Datang di",
  "HeroPrimaryText": "SIE 1 KETAQWAAN",
  "HeroSecondaryText": "MAN 1 JEMBER",
  "HeroDescription": "Membentuk Generasi Berakhlak dan Bertaqwa",
  "HeroLogoSie1": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/logo.png",
  "HeroDeskripsiLogoSie1": "Logo SIE 1 Ketaqwaan",
  "HeroInforSie1": [
    {
      "HeroTotalProker": 20,
      "HeroDeskripsiProker": "Program Kerja"
    }
  ],
  "cta": [
    {
      "text": "Program Kerja",
      "link": "#proker",
      "icon": "fas fa-arrow-right",
      "type": "primary"
    }
  ],
  "slides": [
    {
      "id": 1,
      "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/slide1.jpg",
      "title": "Slide Title",
      "description": "Slide Description"
    }
  ]
}
```

**Response (201):**
```javascript
{
  "message": "Hero section created successfully",
  "heroSection": {
    // ... hero section object
  }
}
```

### PUT /hero/:id
Update hero section (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /hero

**Response (200):**
```javascript
{
  "message": "Hero section updated successfully",
  "heroSection": {
    // ... updated hero section object
  }
}
```

### POST /hero/upload-image
Upload image for hero section (Admin only).

**Headers:** 
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
image: [File] (max 5MB, image formats only)
```

**Response (200):**
```javascript
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/hero_image.jpg",
  "publicId": "ketaqwaan/hero_image"
}
```

---

## 👥 Structure Section Endpoints

### GET /struktur
Get structure section data (Public).

**Response (200):**
```javascript
{
  "struktur": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "Judul": "Struktur Organisasi",
    "JudulDeskripsi": "Berikut adalah struktur organisasi SIE 1 KETAQWAAN",
    "JudulPengurus": "Susunan Pengurus",
    "TahunKepengurusan": "Periode 2024/2025",
    "BaganStukturKorbid": "Koordinator Bidang",
    "BaganStukturKetua": "Ketua",
    "BaganStukturSekretaris": "Sekretaris",
    "BaganStukturBendahara": "Bendahara",
    "members": [
      "Koordinator Bidang: Laqia",
      "Ketua: Habibi",
      "Sekretaris 1: Ainun",
      "Bendahara 1: Nadia Regita",
      "Koordinator sie Humas: Rama"
    ],
    "isActive": true,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /struktur
Create structure section (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "Judul": "Struktur Organisasi",
  "JudulDeskripsi": "Berikut adalah struktur organisasi SIE 1 KETAQWAAN",
  "JudulPengurus": "Susunan Pengurus",
  "TahunKepengurusan": "Periode 2024/2025",
  "BaganStukturKorbid": "Koordinator Bidang",
  "BaganStukturKetua": "Ketua",
  "BaganStukturSekretaris": "Sekretaris",
  "BaganStukturBendahara": "Bendahara",
  "members": [
    "Koordinator Bidang: Laqia",
    "Ketua: Habibi"
  ]
}
```

### PUT /struktur/:id
Update structure section (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /struktur

---

## 📋 Program Kerja Endpoints

### GET /program-kerja
Get program kerja data (Public).

**Response (200):**
```javascript
{
  "programKerja": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "ProgramKerjaJudul": "Program Kerja",
    "ProgramKerjaDeskripsi": "Berbagai program kerja yang kami rancang",
    "programs": [
      {
        "icon": "fas fa-mosque",
        "title": "Maulid Nabi",
        "description": "Program peringatan kelahiran Nabi Muhammad SAW",
        "date": "Rabu, 25 September 2024",
        "status": "Selesai"
      },
      {
        "icon": "fas fa-music",
        "title": "Ekstrakurikuler Hadrah",
        "description": "Program latihan dan pertunjukan seni hadrah",
        "date": "Setiap Jum'at dan Sabtu",
        "status": "Sedang-Berlangsung"
      }
    ],
    "isActive": true,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /program-kerja
Create program kerja (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "ProgramKerjaJudul": "Program Kerja",
  "ProgramKerjaDeskripsi": "Berbagai program kerja yang kami rancang",
  "programs": [
    {
      "icon": "fas fa-mosque",
      "title": "Maulid Nabi",
      "description": "Program peringatan kelahiran Nabi Muhammad SAW",
      "date": "Rabu, 25 September 2024",
      "status": "Selesai"
    }
  ]
}
```

### PUT /program-kerja/:id
Update program kerja (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /program-kerja

---

## 📅 Kegiatan Endpoints

### GET /kegiatan
Get kegiatan data (Public).

**Response (200):**
```javascript
{
  "kegiatan": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "KegiatanJudul": "Peringatan Hari Besar Islam",
    "KegiatanDeskripsi": "Kegiatan-kegiatan dalam memperingati Hari Besar Islam",
    "KegiatanSlide": [
      {
        "title": "MAULID NABI 2024",
        "description": "Pada Maulid Nabi ini mari kita renungkan...",
        "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/maulid.jpg",
        "date": "Rabu, 25 September 2024"
      }
    ],
    "isActive": true,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /kegiatan
Create kegiatan (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "KegiatanJudul": "Peringatan Hari Besar Islam",
  "KegiatanDeskripsi": "Kegiatan-kegiatan dalam memperingati Hari Besar Islam",
  "KegiatanSlide": [
    {
      "title": "MAULID NABI 2024",
      "description": "Pada Maulid Nabi ini mari kita renungkan...",
      "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/maulid.jpg",
      "date": "Rabu, 25 September 2024"
    }
  ]
}
```

### PUT /kegiatan/:id
Update kegiatan (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /kegiatan

### POST /kegiatan/upload-image
Upload image for kegiatan (Admin only).

**Headers:** 
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
image: [File] (max 5MB, image formats only)
```

**Response (200):**
```javascript
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/kegiatan_image.jpg",
  "publicId": "ketaqwaan/kegiatan_image"
}
```

---

## 🎓 Ekstrakurikuler Endpoints

### GET /ekskul
Get ekskul data (Public).

**Response (200):**
```javascript
{
  "ekskul": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "EkskulJudul": "Ekstrakurikuler",
    "EkskulDeskripsi": "Ekstrakurikuler yang dibawahi oleh SIE 1 KETAQWAAN",
    "EkskulSlide": [
      {
        "title": "Tilawah",
        "description": "Program mempelajari dan mendalami irama Al-Qur'an",
        "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/tilawah.jpg",
        "schedule": {
          "day": "Setiap Sabtu",
          "time": "13.00 - Selesai"
        }
      }
    ],
    "isActive": true,
    "updatedBy": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### POST /ekskul
Create ekskul (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "EkskulJudul": "Ekstrakurikuler",
  "EkskulDeskripsi": "Ekstrakurikuler yang dibawahi oleh SIE 1 KETAQWAAN",
  "EkskulSlide": [
    {
      "title": "Tilawah",
      "description": "Program mempelajari dan mendalami irama Al-Qur'an",
      "image": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/tilawah.jpg",
      "schedule": {
        "day": "Setiap Sabtu",
        "time": "13.00 - Selesai"
      }
    }
  ]
}
```

### PUT /ekskul/:id
Update ekskul (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:** Same as POST /ekskul

### POST /ekskul/upload-image
Upload image for ekskul (Admin only).

**Headers:** 
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
image: [File] (max 5MB, image formats only)
```

**Response (200):**
```javascript
{
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/ketaqwaan/image/upload/v1234567890/ekskul_image.jpg",
  "publicId": "ketaqwaan/ekskul_image"
}
```

---

## ⚙️ Settings Endpoints

### Navbar Settings

#### GET /navbar
Get navbar settings (Public).

**Response (200):**
```javascript
{
  "navbar": {
    "NavbarJudul": "SIE 1 KETAQWAAN",
    "NavbarSekolah": "MAN 1 Jember",
    "NavbarMenuMobile": "Menu Navigasi",
    "NavbarHome": "Beranda",
    "NavbarStruktur": "Struktur Organisasi",
    "NavbarProgramKerja": "Program Kerja",
    "NavbarKegiatan": "PHBI",
    "NavbarEkskul": "Ekstrakurikuler",
    "NavbarInformasi": "Informasi",
    "NavbarSaran": "Kotak Saran",
    "NavbarAdmin": "ADMIN",
    "NavbarInstagramLink": "https://www.instagram.com",
    "NavbarTiktokLink": "https://www.tiktok.com",
    "NavbarCopyRight": "© 2025 SIE 1 KETAQWAAN MAN 1 JEMBER"
  }
}
```

#### PUT /navbar
Update navbar settings (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "NavbarJudul": "SIE 1 KETAQWAAN",
  "NavbarSekolah": "MAN 1 Jember",
  "NavbarInstagramLink": "https://www.instagram.com/ketaqwaan",
  "NavbarTiktokLink": "https://www.tiktok.com/@ketaqwaan",
  "NavbarCopyRight": "© 2025 SIE 1 KETAQWAAN MAN 1 JEMBER"
}
```

### Footer Settings

#### GET /footer
Get footer settings (Public).

**Response (200):**
```javascript
{
  "footer": {
    "FooterDeskripsi": "Sie 1 Ketaqwaan adalah organisasi yang berada di lingkungan MAN 1 JEMBER.",
    "FooterLinkInstagram": "/page-html/page-comingsoon.html",
    "FooterLinkTiktok": "/page-html/page-comingsoon.html",
    "FooterAlamatJalan": "Jl. Imam Bonjol No.50",
    "FooterAlamatKecamatan": "Kaliwates Kidul, Kaliwates,",
    "FooterAlamatKota": "Kec. Kaliwates, Kabupaten Jember,",
    "FooterAlamatProvinsi": "Jawa Timur 68131.",
    "FooterNarahubung": "Jika ada eror hubungi Admin yaaa 🤩"
  }
}
```

#### PUT /footer
Update footer settings (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "FooterDeskripsi": "Sie 1 Ketaqwaan adalah organisasi yang berada di lingkungan MAN 1 JEMBER.",
  "FooterAlamatJalan": "Jl. Imam Bonjol No.50",
  "FooterAlamatKecamatan": "Kaliwates Kidul, Kaliwates,",
  "FooterAlamatKota": "Kec. Kaliwates, Kabupaten Jember,",
  "FooterAlamatProvinsi": "Jawa Timur 68131.",
  "FooterNarahubung": "Jika ada eror hubungi Admin yaaa 🤩"
}
```

### Informasi Settings

#### GET /informasi
Get informasi settings (Public).

**Response (200):**
```javascript
{
  "informasi": {
    "InformasiJudul": "INFORMASI",
    "InformasiDeskripsi": "Pengumuman tentang siapa saja yang lolos menjadi anggota sie 1 ketaqwaan MAN 1 Jember.",
    "InfomasiLink": "https://lookerstudio.google.com/reporting/dcf3ad5b-7817-4c57-b6ed-3bf6e96e6d96"
  }
}
```

#### PUT /informasi
Update informasi settings (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "InformasiJudul": "INFORMASI",
  "InformasiDeskripsi": "Pengumuman tentang siapa saja yang lolos menjadi anggota sie 1 ketaqwaan MAN 1 Jember.",
  "InfomasiLink": "https://lookerstudio.google.com/reporting/dcf3ad5b-7817-4c57-b6ed-3bf6e96e6d96"
}
```

### Saran Settings

#### GET /saran
Get saran settings (Public).

**Response (200):**
```javascript
{
  "saran": {
    "SaranJudul": "Kotak Saran",
    "SaranDeskripsi": "Berikan semua kritik, saran, dan apresiasi anda kepada kami😊",
    "SaranSubDeskripsi": "Tenang semua masukan yang anda berikan akan bersifat anonim😶‍🌫️",
    "SaranLink": "https://kotaksaran-ketaqwaanman1jember.vercel.app/"
  }
}
```

#### PUT /saran
Update saran settings (Admin only).

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```javascript
{
  "SaranJudul": "Kotak Saran",
  "SaranDeskripsi": "Berikan semua kritik, saran, dan apresiasi anda kepada kami😊",
  "SaranSubDeskripsi": "Tenang semua masukan yang anda berikan akan bersifat anonim😶‍🌫️",
  "SaranLink": "https://kotaksaran-ketaqwaanman1jember.vercel.app/"
}
```

---

## 🔍 Health Check

### GET /health
Check API health status.

**Response (200):**
```javascript
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

---

## 📊 Rate Limiting

### General API Limits
- **Rate Limit**: 100 requests per 15 minutes per IP
- **Login Attempts**: 5 attempts per 15 minutes per IP
- **Account Creation**: 5 accounts per hour per IP

### Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

---

## 🚨 Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

## 📝 Notes

1. All timestamps are in ISO 8601 format (UTC)
2. File uploads are limited to 5MB
3. Only image files are allowed for uploads
4. JWT tokens expire after 7 days
5. All admin endpoints require authentication
6. Super admin role required for user management