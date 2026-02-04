<div align="center">

# ☁️ Cloud Based – File Storage Frontend

## 🎓 Đồ án môn Điện Toán Đám Mây – Cloud Computing

Xây dựng giao diện hệ thống lưu trữ file trên đám mây sử dụng Next.js + AWS S3 + Presigned URL

</div>

---

## 📖 Giới thiệu

**Cloud Based** là một hệ thống mô phỏng cơ chế hoạt động của các nền tảng lưu trữ đám mây như Google Drive / Dropbox.

Repository này chứa **Frontend (Client Side)** được xây dựng bằng Next.js, chịu trách nhiệm:
- Hiển thị giao diện người dùng
- Upload / Download file trực tiếp lên AWS S3
- Quản lý file cá nhân
- Gọi API Backend (Python – Django)
- Áp dụng cơ chế Presigned URL để tối ưu hiệu năng Cloud

👉 **Mục tiêu chính**: Hiểu rõ luồng dữ liệu từ Local → Cloud Storage

---

## 🚀 Demo chức năng

### 👤 Người dùng

- ✅ Đăng ký / Đăng nhập
- ✅ Upload tối đa 5 file cùng lúc
- ✅ Hỗ trợ: Image, PDF, Word, Excel, Video
- ✅ Preview: Image / PDF / Video
- ✅ Đổi tên file
- ✅ Tải file xuống (Download)
- ✅ Xóa mềm → Thùng rác
- ✅ Khôi phục file
- ✅ Cập nhật Avatar + Full Name
- ✅ Theo dõi dung lượng sử dụng
- ✅ Đổi mật khẩu

---

## 🛠️ Công nghệ sử dụng

### ⚡ Frontend
- **Next.js 16** (App Router)
- **React** + **TypeScript**
- **TailwindCSS** (styling)
- **Framer Motion** (animation)
- **FilePond** (upload + preview)
- **Sonner** (toast notification)
- **Lucide React** (icons)

### ☁️ Cloud
- **AWS S3** (Object Storage)
- **Presigned URL** Upload/Download

### 🔙 Backend (repo riêng)
- **Python** – Django REST API
- SQL Database

---

## 📂 Cấu trúc thư mục
```
fe_cloudbasedfilerj/
├── .next/                    # Next.js build output
├── node_modules/             # Dependencies
├── public/                   # Static files
├── src/
│   ├── api/                  # API integration
│   ├── app/                  # Next.js App Router
│   │   ├── (pages)/          # Route groups
│   │   │   ├── (home)/       # Home page
│   │   │   ├── about/        # About page
│   │   │   ├── auth/         # Authentication pages
│   │   │   └── dashboard/    # Dashboard & file manager
│   │   ├── components/       # React components
│   │   ├── favicon.ico       # Favicon
│   │   ├── globals.css       # Global styles
│   │   └── layout.tsx        # Root layout
│   ├── helpers/              # Helper functions
│   ├── lib/                  # Libraries
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
├── middlewares/              # Next.js middlewares
├── .env.local                # Environment variables (tạo file này)
├── .gitignore                # Git ignore
├── eslint.config.mjs         # ESLint config
├── next-env.d.ts             # Next.js TypeScript declarations
├── next.config.ts            # Next.js configuration
├── package-lock.json         # Lock file
├── package.json              # Dependencies
├── postcss.config.mjs        # PostCSS config
├── README.md                 # This file
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

---

## ⚙️ Cài đặt & chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- npm hoặc yarn
- Backend API đã chạy

### 1️⃣ Clone repository
```bash
git clone https://github.com/silasngt/fe_cloudBasedFilePrj.git
cd fe_cloudbasedfilerj
```

### 2️⃣ Cài đặt dependencies
```bash
npm install
# hoặc
yarn install
```

### 3️⃣ Tạo file môi trường

Tạo file `.env.local` trong thư mục gốc:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_AWS_REGION=ap-southeast-1
```

👉 **Lưu ý**: Đảm bảo Backend server đã chạy và trỏ đúng URL

### 4️⃣ Chạy development server
```bash
npm run dev
# hoặc
yarn dev
```

Mở trình duyệt tại:
```
http://localhost:3000
```

### 5️⃣ Build cho production
```bash
npm run build
npm start
```

---

## ☁️ Luồng Upload bằng Presigned URL

### Phương pháp truyền thống (chậm):
```
Client → Backend → S3 ❌
- File phải đi qua server
- Tốn băng thông server
- Chậm với file lớn
```

### Phương pháp Presigned URL (tối ưu):
```
Client → Backend (lấy URL) → Upload trực tiếp S3 ✅
- Upload trực tiếp lên S3
- Không qua server
- Nhanh & tiết kiệm tài nguyên
```

### Quy trình chi tiết:

1. **Client** gửi metadata file (tên, kích thước, loại) → **Backend**
2. **Backend** tạo Presigned URL từ AWS S3 → trả về **Client**
3. **Client** upload file trực tiếp lên **S3** sử dụng Presigned URL
4. **Backend** lưu metadata file vào **Database**

### Lợi ích:

- 🚀 **Tăng tốc độ**: Upload trực tiếp lên Cloud
- 🔥 **Giảm tải server**: Backend chỉ xử lý metadata
- 💰 **Tiết kiệm băng thông**: Không cần proxy qua server
- 🔐 **Bảo mật cao**: URL có thời gian hết hạn

---

## 🎯 Kiến trúc hệ thống
```
┌─────────────────┐
│  Frontend       │
│  (Next.js)      │
│  - UI/UX        │
│  - File Upload  │
└────────┬────────┘
         │
         │ REST API
         ▼
┌─────────────────┐
│  Backend        │
│  (Django)       │
│  - Auth         │
│  - Presigned    │
│  - Metadata     │
└────────┬────────┘
         │
         │ SDK
         ▼
┌─────────────────┐
│  AWS S3         │
│  (Cloud)        │
│  - File Storage │
└─────────────────┘
```

👉 **Mô hình**: Client – Server – Cloud Architecture

---

## 🧠 Kiến thức Cloud Computing áp dụng

Dự án này giúp thực hành các khái niệm quan trọng:

### 1. Object Storage (AWS S3)
- Lưu trữ file dạng Object
- Quản lý bucket và permissions
- Metadata và versioning

### 2. Presigned URL
- Tạo URL tạm thời cho upload/download
- Bảo mật với thời gian hết hạn
- Không cần credentials phía client

### 3. IAM & Security
- IAM Policy cho S3 bucket
- CORS Configuration
- Public vs Private access

### 4. Cloud Architecture
- Tách biệt Frontend / Backend / Storage
- Scalability và Performance
- Cost optimization

---

## 🔑 Tính năng nổi bật

### Upload thông minh
- Multi-file upload (tối đa 5 files)
- Progress tracking real-time
- Validation file type & size

### Quản lý file
- Danh sách file 
- Search & filter
- Rename file
- Soft delete (thùng rác)
- Restore file

### User Experience
- Toast notification với Sonner
- Smooth animation với Framer Motion
- Responsive design
- Dark mode support

---

## 👨‍💻 Thành viên nhóm

| MSSV | Họ và tên | Vai trò |
|------|-----------|---------|
| 225I120049 | Nguyễn Giang Thành Tài | Nhóm trưởng |
| 225I120103 | Võ Văn Phúc | Thành viên |
| 225I120098 | Trịnh Thị Nghĩa | Thành viên |
| 225I120069 | Đỗ Thị Ngọc Diễm | Thành viên |
| 2254030146 | Trịnh Hồ Ngọc Trung Kiên | Thành viên |

**Trường**: Đại học Giao thông vận tải TP.HCM  
**Môn học**: [010412303901] – Điện toán đám mây  
**Giảng viên hướng dẫn**: _(TS.Hàn Trung Định)_

---


## 🚧 Roadmap

- [ ] Add file sharing functionality
- [ ] Implement folder structure
- [ ] Add file versioning
- [ ] Real-time collaboration
- [ ] Mobile app version

---

## 📌 Ghi chú quan trọng

⚠️ **Repository này chỉ chứa Frontend**

- Backend API (Django) nằm ở repository riêng
- Cần cấu hình AWS S3 bucket và IAM permissions
- File `.env.local` không được commit lên Git

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📜 License

Dự án được phát triển cho mục đích học tập & nghiên cứu.

---

## 🔗 Links

- Backend Repository: _(https://github.com/phucDev-2004/-CLoud-based-File-Storage.git)_
- AWS S3 Guide: [AWS Documentation](https://aws.amazon.com/s3/)

---

<div align="center">

### 🌟 Nếu thấy project hữu ích, hãy cho chúng tôi một ⭐ trên GitHub!

<i>Phát triển với ☁️ và ❤️ bởi nhóm 6 sinh viên UTH</i>

</div>
