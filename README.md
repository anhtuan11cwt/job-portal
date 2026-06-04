# SunfireSensei Job Portal

> Trang web tìm kiếm việc làm & tuyển dụng trực tuyến — Kết nối ứng viên (sinh viên) với nhà tuyển dụng.

**Tác giả:** Trần Anh Tuấn  
**Liên kết:** [SunfireSensei Job Portal trên Render](https://sunfiresensei-job-portal.onrender.com)  
**GitHub:** [github.com/anhtuan11cwt/SunfireSensei-job-portal](https://github.com/anhtuan11cwt/SunfireSensei-job-portal)

---

## Mục lục

- [Tổng quan](#tổng-quan)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Mô hình dữ liệu (Database)](#mô-hình-dữ-liệu-database)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Company](#company)
  - [Job](#job)
  - [Application](#application)
- [Frontend — Giao diện người dùng](#frontend--giao-diện-người-dùng)
  - [Trang công khai](#trang-công-khai)
  - [Trang dành cho ứng viên (student)](#trang-dành-cho-ứng-viên-student)
  - [Trang dành cho nhà tuyển dụng (recruiter)](#trang-dành-cho-nhà-tuyển-dụng-recruiter)
  - [Component structure](#component-structure)
- [Xác thực & Phân quyền](#xác-thực--phân-quyền)
- [Upload file](#upload-file)
- [Cấu hình môi trường](#cấu-hình-môi-trường)
- [Cài đặt & Chạy dự án](#cài-đặt--chạy-dự-án)
- [Scripts](#scripts)
- [Triển khai (Deploy)](#triển-khai-deploy)
- [Giấy phép](#giấy-phép)

---

## Tổng quan

SunfireSensei Job Portal là một ứng dụng web full-stack cho phép:

- **Ứng viên (Student):** Tìm kiếm việc làm, duyệt tin tuyển dụng, xem chi tiết công việc, ứng tuyển, theo dõi trạng thái đơn ứng tuyển, quản lý hồ sơ cá nhân (kỹ năng, ảnh đại diện, bio).
- **Nhà tuyển dụng (Recruiter):** Đăng ký / quản lý công ty, đăng tin tuyển dụng, xem danh sách ứng viên đã ứng tuyển, cập nhật trạng thái đơn (chấp nhận / từ chối).

Toàn bộ giao diện được xây dựng bằng tiếng Việt, hướng đến thị trường Việt Nam.

---

## Công nghệ sử dụng

### Backend

| Công nghệ       | Phiên bản | Mục đích                                         |
|-----------------|-----------|--------------------------------------------------|
| Node.js         | (ESM)     | Runtime JavaScript phía server                    |
| Express         | 5.x       | Web framework                                    |
| MongoDB         | -         | Cơ sở dữ liệu NoSQL                              |
| Mongoose        | 9.x       | ODM cho MongoDB, định nghĩa schema & truy vấn    |
| jsonwebtoken    | 9.x       | JWT — tạo & xác thực token                       |
| bcryptjs        | 3.x       | Băm mật khẩu                                     |
| Cloudinary      | 1.x       | Lưu trữ ảnh trên cloud                           |
| multer-storage-cloudinary | 4.x | Upload file trực tiếp lên Cloudinary qua Multer |
| cookie-parser   | 1.x       | Parse cookie từ request                          |
| cors            | 2.x       | Cấu hình CORS                                    |
| multer          | 2.x       | Middleware xử lý file upload (multipart/form-data)|
| dotenv          | 17.x      | Quản lý biến môi trường                          |

### Frontend

| Công nghệ         | Phiên bản | Mục đích                                        |
|-------------------|-----------|-------------------------------------------------|
| React             | 19.x      | Thư viện UI                                     |
| Vite              | 8.x       | Build tool                                      |
| React Router      | 7.x       | Routing client-side                             |
| Redux Toolkit     | 2.x       | Quản lý state toàn cục                          |
| redux-persist     | 6.x       | Persist state Redux vào localStorage            |
| Axios             | 1.x       | HTTP client để gọi API                          |
| Tailwind CSS      | 4.x       | Utility-first CSS framework                     |
| Radix UI          | 1.x       | Component UI không-styled (primitive)           |
| shadcn/ui         | 4.x       | Bộ component được build trên Radix UI + Tailwind|
| Framer Motion     | 12.x      | Animation                                       |
| Lucide React      | 1.x       | Icon vector                                     |
| Sonner            | 2.x       | Toast notification                              |
| Embla Carousel    | 8.x       | Carousel                                        |
| class-variance-authority / clsx / tailwind-merge | - | Utility classes |

---

## Kiến trúc hệ thống

Dự án được tổ chức theo mô hình **Monorepo** với hai workspace chính:

```
SunfireSensei-job-portal/
├── backend/          # REST API server (Express)
└── frontend/         # React SPA (Vite)
```

### Backend Architecture — Service Layer Pattern

```
Route  →  Controller  →  Service (nếu có)  →  Model (Mongoose)
```

- **Route:** Định nghĩa HTTP method, path, middleware, gắn với controller.
- **Controller:** Xử lý request/response, validation cơ bản, gọi Model.
- **Middleware:** Xác thực (JWT), upload file (Multer), xử lý lỗi.
- **Model:** Schema Mongoose tương ứng với collection MongoDB.

### Frontend Architecture

```
Component (Page)  →  Custom Hook (gọi API)  →  Redux Slice (lưu state)
```

- **Pages:** Các component "tầm cao" đại diện cho mỗi route.
- **Custom Hooks:** Đóng gọi API bằng Axios, dispatch action lên Redux.
- **Redux Store:** 3 slice — `auth`, `job`, `company` — persist `auth` vào localStorage.

---

## Cấu trúc thư mục

```
SunfireSensei-job-portal/
├── backend/
│   ├── config/                          # Cấu hình (ví dụ: env)
│   ├── controllers/
│   │   ├── application.controller.js    # Xử lý đơn ứng tuyển
│   │   ├── company.controller.js        # Xử lý công ty
│   │   ├── job.controller.js            # Xử lý tin tuyển dụng
│   │   └── user.controller.js           # Xử lý người dùng (đăng ký, đăng nhập, ...)
│   ├── docs/                            # Tài liệu
│   ├── frontend/                        # Frontend build tĩnh phục vụ production
│   ├── middleware/
│   ├── middlewares/
│   │   ├── isAuthenticated.js           # Middleware xác thực JWT
│   │   └── multer.js                    # Cấu hình Multer + Cloudinary Storage
│   ├── models/
│   │   ├── application.model.js         # Schema Application
│   │   ├── company.model.js             # Schema Company
│   │   ├── job.model.js                 # Schema Job
│   │   └── user.model.js                # Schema User
│   ├── postman/                         # Collection Postman
│   ├── repositories/                    # Repository pattern (tương lai)
│   ├── routes/
│   │   ├── application.route.js         # /api/v1/application
│   │   ├── company.route.js             # /api/v1/company
│   │   ├── job.route.js                 # /api/v1/job
│   │   └── user.route.js                # /api/v1/user
│   ├── services/                        # Business logic layer (tương lai)
│   ├── types/                           # Type definitions (tương lai)
│   ├── utils/
│   │   ├── cloudinary.js                # Cấu hình Cloudinary SDK
│   │   └── db.js                        # Kết nối MongoDB
│   ├── index.js                         # Entry point — Express app
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/                      # Hình ảnh, icon
│   │   ├── components/
│   │   │   ├── admin/                   # Quản trị (recruiter)
│   │   │   ├── authentication/          # Đăng nhập, đăng ký
│   │   │   ├── home/                    # Component cho trang chủ
│   │   │   ├── jobs/                    # Filter card, JobCard, ...
│   │   │   ├── pages/                   # Các trang chính
│   │   │   ├── shared/                  # Navbar, Footer, ProtectedRoute
│   │   │   └── ui/                      # shadcn/ui components
│   │   ├── hooks/                       # Custom hooks gọi API
│   │   ├── lib/
│   │   │   └── utils.js                 # Hàm tiện ích (cn)
│   │   ├── redux/
│   │   │   ├── store.js                 # Cấu hình Redux Store + persist
│   │   │   ├── authSlice.js             # Slice auth (user, loading)
│   │   │   ├── companySlice.js          # Slice company
│   │   │   └── jobSlice.js              # Slice job (allJobs, singleJob, ...)
│   │   ├── utils/
│   │   │   ├── constant.js              # URL API endpoints
│   │   │   ├── formatCurrency.js        # Định dạng tiền tệ VND
│   │   │   ├── formatDate.js            # Định dạng ngày tháng
│   │   │   └── translateJobType.js      # Dịch loại công việc (full-time, part-time, ...)
│   │   ├── App.jsx                      # Root component + Routing
│   │   ├── App.css
│   │   ├── index.css                    # Tailwind directives
│   │   └── main.jsx                     # Entry point React
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
├── README.md                            # (Bạn đang đọc file này)
└── ...
```

---

## Mô hình dữ liệu (Database)

### User (`users` collection)

| Trường        | Kiểu dữ liệu      | Ràng buộc                              |
|---------------|-------------------|----------------------------------------|
| `cccd`        | String            | required, unique (Căn cước công dân)   |
| `email`       | String            | required, unique                       |
| `fullName`    | String            | required                               |
| `password`    | String            | required (đã băm bcrypt)               |
| `phoneNumber` | String            | required, unique                       |
| `profile`     | Object            | `{ bio, company (ref Company), profilePhoto, skills[] }` |
| `role`        | String (enum)     | required — `"student"` hoặc `"recruiter"` |
| `timestamps`  | -                 | createdAt, updatedAt                   |

### Company (`companies` collection)

| Trường        | Kiểu dữ liệu      | Ràng buộc                              |
|---------------|-------------------|----------------------------------------|
| `name`        | String            | required, unique                       |
| `description` | String            | -                                      |
| `website`     | String            | -                                      |
| `location`    | String            | -                                      |
| `logo`        | String            | URL ảnh từ Cloudinary                  |
| `userId`      | ObjectId (ref User)| required — người tạo công ty           |
| `timestamps`  | -                 | createdAt, updatedAt                   |

### Job (`jobs` collection)

| Trường        | Kiểu dữ liệu          | Ràng buộc                       |
|---------------|-----------------------|---------------------------------|
| `title`       | String                | required — tiêu đề công việc   |
| `description` | String                | required — mô tả               |
| `requirements`| String                | -                               |
| `salary`      | Number                | required — mức lương           |
| `location`    | String                | required — địa điểm            |
| `jobType`     | String                | required — full-time, part-time, ... |
| `experience`  | Number                | required — số năm kinh nghiệm  |
| `position`    | Number                | required — số lượng tuyển      |
| `company`     | ObjectId (ref Company) | required                        |
| `created_by`  | ObjectId (ref User)   | required — người đăng tin      |
| `applications`| [ObjectId] (ref Application) | Danh sách đơn ứng tuyển  |
| `timestamps`  | -                     | createdAt, updatedAt            |

### Application (`applications` collection)

| Trường      | Kiểu dữ liệu       | Ràng buộc                            |
|-------------|--------------------|--------------------------------------|
| `applicant` | ObjectId (ref User)| required — ứng viên                  |
| `job`       | ObjectId (ref Job) | required — công việc                 |
| `status`    | String (enum)      | `"pending"` (mặc định) / `"accepted"` / `"rejected"` |
| `timestamps`| -                  | createdAt, updatedAt                 |

### Quan hệ giữa các model

- **User (1) → (N) Application:** Một user có thể ứng tuyển nhiều công việc.
- **User (1) → (N) Company (với role recruiter):** Một nhà tuyển dụng có thể quản lý nhiều công ty.
- **User (1) → (N) Job (với role recruiter):** Một nhà tuyển dụng có thể đăng nhiều tin tuyển dụng.
- **Company (1) → (N) Job:** Một công ty có nhiều tin tuyển dụng.
- **Job (1) → (N) Application:** Một tin tuyển dụng có nhiều đơn ứng tuyển.
- **Application (N) → (1) User (applicant):** Mỗi đơn ứng tuyển thuộc về một ứng viên.

---

## API Endpoints

Base URL: `/api/v1`

### User

| Method | Endpoint                    | Auth     | Mô tả                                      |
|--------|-----------------------------|----------|---------------------------------------------|
| POST   | `/user/register`            | ❌       | Đăng ký tài khoản mới (multipart: profilePhoto) |
| POST   | `/user/login`               | ❌       | Đăng nhập, trả về JWT trong httpOnly cookie |
| GET    | `/user/logout`              | ❌       | Đăng xuất (xóa cookie)                      |
| PUT    | `/user/profile/update`      | ✅ JWT   | Cập nhật hồ sơ (fullName, email, phone, bio, skills, profilePhoto) |

**Yêu cầu đăng ký:** `fullName`, `email`, `phoneNumber`, `password`, `role`, `cccd`  
**Yêu cầu đăng nhập:** `email`, `password`, `role`, `cccd`

### Company

| Method | Endpoint                          | Auth     | Mô tả                                    |
|--------|-----------------------------------|----------|------------------------------------------|
| POST   | `/company/register`               | ✅ JWT   | Đăng ký công ty mới                      |
| GET    | `/company/get`                    | ✅ JWT   | Lấy danh sách công ty của user hiện tại  |
| GET    | `/company/get/:id`                | ✅ JWT   | Lấy chi tiết công ty theo ID             |
| PUT    | `/company/update/:id`             | ✅ JWT   | Cập nhật thông tin công ty (multipart: logo) |

**Yêu cầu đăng ký:** `name` (bắt buộc), `description`, `website`, `location`

### Job

| Method | Endpoint                    | Auth     | Mô tả                                      |
|--------|-----------------------------|----------|---------------------------------------------|
| POST   | `/job/post`                 | ✅ JWT   | Đăng tin tuyển dụng mới                     |
| GET    | `/job/get`                  | ✅ JWT   | Lấy tất cả tin tuyển dụng (hỗ trợ ?keyword=) |
| GET    | `/job/get/:id`              | ✅ JWT   | Lấy chi tiết công việc theo ID             |
| GET    | `/job/getadminjobs`         | ✅ JWT   | Lấy tin tuyển dụng do user hiện tại đăng   |

**Yêu cầu đăng tin:** `title`, `description`, `salary`, `location`, `jobType`, `experience`, `position`, `companyId`

### Application

| Method | Endpoint                                | Auth     | Mô tả                                           |
|--------|-----------------------------------------|----------|-------------------------------------------------|
| GET    | `/application/apply/:id`                | ✅ JWT   | Ứng tuyển vào công việc (jobId = :id)          |
| GET    | `/application/get`                      | ✅ JWT   | Lấy danh sác đơn đã ứng tuyển của user         |
| GET    | `/application/:id/applicants`           | ✅ JWT   | Lấy danh sách ứng viên của một công việc       |
| POST   | `/application/status/:id/update`        | ✅ JWT   | Cập nhật trạng thái đơn (pending/accepted/rejected) |

---

## Frontend — Giao diện người dùng

### Trang công khai

| Route                        | Component          | Mô tả                                          |
|------------------------------|--------------------|-------------------------------------------------|
| `/`                          | `Home`             | Trang chủ — Header tìm kiếm, danh mục, việc làm mới nhất |
| `/browse?keyword=...`        | `Browse`           | Kết quả tìm kiếm việc làm                       |
| `/jobs`                      | `Jobs`             | Danh sách việc làm + bộ lọc (FilterCard)       |
| `/description/:id`           | `JobDescription`   | Chi tiết một công việc                          |
| `/login`                     | `Login`            | Đăng nhập                                       |
| `/register`                  | `Register`         | Đăng ký tài khoản                               |
| `/privacy`                   | `PrivacyPolicy`    | Chính sách bảo mật                              |
| `/terms`                     | `TermsServices`    | Điều khoản dịch vụ                              |

### Trang dành cho ứng viên (student)

| Route      | Component | Mô tả                                      |
|------------|-----------|---------------------------------------------|
| `/profile` | `Profile` | Hồ sơ cá nhân + danh sách việc đã ứng tuyển |

### Trang dành cho nhà tuyển dụng (recruiter)

| Route                           | Component        | Mô tả                                    |
|---------------------------------|-------------------|------------------------------------------|
| `/admin/companies`              | `Companies`       | Danh sách công ty đã đăng ký             |
| `/admin/companies/create`       | `CompanyCreate`   | Đăng ký công ty mới                      |
| `/admin/companies/:id`          | `CompanySetup`    | Chỉnh sửa thông tin công ty              |
| `/admin/jobs`                   | `AdminJobs`       | Danh sách tin tuyển dụng đã đăng         |
| `/admin/jobs/create`            | `PostJob`         | Đăng tin tuyển dụng mới                  |
| `/admin/jobs/:id/applicants`    | `Applicants`      | Xem ứng viên của một tin tuyển dụng      |

> Các route `/admin/*` được bảo vệ bởi `ProtectedRoute` — nếu chưa đăng nhập sẽ chuyển hướng về `/login`.

### Component structure

```
components/
├── admin/          Companies.jsx, CompanyCreate.jsx, CompanySetup.jsx,
│                   AdminJobs.jsx, PostJob.jsx, Applicants.jsx
├── authentication/ Login.jsx, Register.jsx
├── home/           Header.jsx, Category.jsx, LatestJobs.jsx, JobCard.jsx
├── jobs/           FilterCard.jsx
├── pages/          Home.jsx, Browse.jsx, Jobs.jsx, JobDescription.jsx,
│                   Profile.jsx, EditProfileModal.jsx,
│                   PrivacyPolicy.jsx, TermsServices.jsx
├── shared/         Navbar.jsx, Footer.jsx, ProtectedRoute.jsx
└── ui/             Các component shadcn/ui (button, input, card, avatar, badge, ...)
```

### Redux State Management

| Slice     | State chính                                        | Actions                                        |
|-----------|-----------------------------------------------------|------------------------------------------------|
| `auth`    | `user`, `loading`                                   | `setUser`, `setLoading`                        |
| `job`     | `allJobs`, `singleJob`, `allAdminJobs`, `allAppliedJobs`, `searchedQuery`, `searchJobByText` | `setAllJobs`, `setSingleJob`, `setAllAdminJobs`, `setAllAppliedJobs`, `setSearchedQuery`, `setSearchJobByText` |
| `company` | `companies`, `singleCompany`                        | `setCompanies`, `setSingleCompany`             |

**Lưu ý:** State `auth` được persist vào `localStorage` qua `redux-persist` (whitelist: `["auth"]`).

### Custom Hooks

| Hook                    | Mục đích                                    |
|-------------------------|---------------------------------------------|
| `useGetAllJobs`         | Fetch tất cả jobs -> dispatch `setAllJobs`  |
| `useGetAllAdminJobs`    | Fetch jobs của admin -> dispatch `setAllAdminJobs` |
| `useGetAllCompanies`    | Fetch companies của user -> dispatch `setCompanies` |
| `useGetCompanyById`     | Fetch company theo ID -> dispatch `setSingleCompany` |
| `useGetAppliedJobs`     | Fetch applied jobs -> dispatch `setAllAppliedJobs` |

---

## Xác thực & Phân quyền

- **Đăng ký:** Người dùng chọn role `student` hoặc `recruiter`.
- **Đăng nhập:** Server xác thực email + password + CCCD + role, sau đó tạo JWT (1 ngày) và gửi qua **httpOnly cookie** (sameSite: "strict").
- **Middleware `isAuthenticated`:**
  1. Đọc token từ `req.cookies.token`.
  2. Verify JWT với `SECRET_KEY`.
  3. Gắn `req.id = decoded.userId` để controller biết user hiện tại.
- **Phân quyền:** Dựa trên `role` trong MongoDB:
  - `student` — xem danh sách việc làm, ứng tuyển, xem profile.
  - `recruiter` — quản lý công ty, đăng tin, xem ứng viên.
  - Frontend kiểm tra `user.role` để redirect thích hợp (ví dụ Home redirect recruiter về `/admin/companies`).

---

## Upload file

Dự án sử dụng **Cloudinary** để lưu trữ ảnh, thông qua `multer-storage-cloudinary`:

- **Ảnh đại diện** (`profilePhoto`): Lưu trong folder `SunfireSensei-job-portal/user/avatars`, crop tối đa 500×500.
- **Logo công ty** (`logo`): Lưu trong folder `SunfireSensei-job-portal/company/logos`, crop tối đa 500×500.

Cấu hình Cloudinary SDK trong `backend/utils/cloudinary.js` (dùng biến môi trường `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).

---

## Cấu hình môi trường

Tạo file `.env` trong thư mục `backend/` với các biến sau:

```env
# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>

# JWT
SECRET_KEY=your_jwt_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5001
NODE_ENV=development          # "development" | "production"
FRONTEND_URL=http://localhost:5173
```

Tạo file `.env` trong thư mục `frontend/`:

```env
VITE_API_URL=http://localhost:5001/api/v1
```

---

## Cài đặt & Chạy dự án

### Yêu cầu

- Node.js >= 18
- npm >= 9
- MongoDB (Atlas hoặc local)

### 1. Clone repository

```bash
git clone https://github.com/anhtuan11cwt/SunfireSensei-job-portal.git
cd SunfireSensei-job-portal
```

### 2. Cài đặt dependencies

```bash
# Cài đặt dependencies cho backend
cd backend
npm install

# Cài đặt dependencies cho frontend
cd ../frontend
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` trong `backend/` và `frontend/` (xem [Cấu hình môi trường](#cấu-hình-môi-trường)).

### 4. Chạy development

**Chạy backend (port 5001):**
```bash
cd backend
npm run dev
```

**Chạy frontend (port 5173):**
```bash
cd frontend
npm run dev
```

Frontend sẽ mặc định gọi API đến `http://localhost:5001/api/v1`.  
Mở trình duyệt tại `http://localhost:5173`.

---

## Scripts

### Backend

| Script      | Lệnh                          | Mô tả                                    |
|-------------|-------------------------------|------------------------------------------|
| `dev`       | `nodemon index.js`            | Chạy dev server với hot-reload           |
| `predev`    | `npx kill-port 5001`          | Giải phóng port 5001 trước khi chạy dev  |
| `start`     | `node index.js`               | Chạy production server                   |
| `build`     | `npm install && npm install --prefix frontend && npm run build --prefix frontend` | Build full-stack cho production |
| `lint`      | `eslint .`                    | Kiểm tra lint (ESLint)                   |
| `check`     | `biome check --write`         | Kiểm tra & format (Biome)                |
| `format`    | `biome format --write`        | Format code (Biome)                      |

### Frontend

| Script    | Lệnh              | Mô tả                                    |
|-----------|-------------------|------------------------------------------|
| `dev`     | `vite`            | Chạy dev server                          |
| `build`   | `vite build`      | Build cho production                     |
| `preview` | `vite preview`    | Xem trước bản build                      |
| `lint`    | `eslint .`        | Kiểm tra lint (ESLint)                   |
| `check`   | `biome check --write` | Kiểm tra & format (Biome)             |
| `format`  | `biome format --write` | Format code (Biome)                   |

---

## Triển khai (Deploy)

Dự án được triển khai trên **Render** (PaaS) tại:  
👉 [https://sunfiresensei-job-portal.onrender.com](https://sunfiresensei-job-portal.onrender.com)

Cấu hình build:

```bash
cd backend && npm install && npm install --prefix frontend && npm run build --prefix frontend
```

Start command:

```bash
cd backend && npm start
```

Trong môi trường production:

- Express tự động serve thư mục `frontend/dist/` dưới dạng static files.
- Mọi route không phải API sẽ trả về `index.html` (SPA fallback).
- Frontend không cần chạy riêng; tất cả được phục vụ qua cùng một Express server.
- CORS origin được set bằng `FRONTEND_URL` từ `.env`.

---

## Giấy phép

Dự án được phân phối dưới giấy phép **ISC**.