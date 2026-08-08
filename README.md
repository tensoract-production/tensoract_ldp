# Tensoract

Website công ty Tensoract — Next.js 16 + Payload CMS 3, song ngữ Việt/Anh.

Branch `des_v1` hiện chứa V2 wireframe: homepage code-native ưu tiên cấu trúc nội dung;
Payload chỉ quản lý blog.

## Chạy bằng Docker

Docker Compose chạy production build của Next.js/Payload cùng PostgreSQL 16.

```bash
cp .env.example .env
```

Sinh ba secret độc lập và một mật khẩu PostgreSQL URL-safe, sau đó điền vào `.env`:

```bash
openssl rand -hex 32
```

Đặt `DATABASE_URL` khi chạy ứng dụng trực tiếp trên máy, ví dụ với mật khẩu vừa tạo:

```text
postgresql://payload:YOUR_POSTGRES_PASSWORD@127.0.0.1:5432/tensoract
```

Khởi động toàn bộ stack:

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f payload
```

Mặc định app và PostgreSQL chỉ bind vào `127.0.0.1`. Mở
http://localhost:3000; Payload Admin nằm tại http://localhost:3000/admin.

## Chạy trực tiếp tại máy

Cần Node `>=20.9.0` và PostgreSQL.

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run dev
```

Mở http://localhost:3000. Route không có locale tự chuyển sang `/vi`.
Payload Admin nằm tại http://localhost:3000/admin.

## Lưu ý bảo mật khi triển khai

- Không commit `.env`; Git chỉ theo dõi `.env.example` không chứa credential.
- Dùng secret ngẫu nhiên khác nhau, tối thiểu 32 ký tự cho Payload, cron và preview.
- Giữ PostgreSQL ở `127.0.0.1`; không public cổng `5432` ra Internet.
- Đặt reverse proxy có HTTPS phía trước app. Chỉ đổi `APP_BIND_ADDRESS` khi hạ tầng
  thực sự yêu cầu và đã có firewall.
- Backup volume `postgres_data` định kỳ. Upload nằm trong `media_data`; production
  nhiều replica nên chuyển sang object storage như S3 thay vì filesystem cục bộ.
- Image chạy bằng user không phải root và filesystem read-only. Không mount source
  code hoặc Docker socket vào container production.
- Docker Compose phù hợp local/single-host. Production cần quản lý secret của nền
  tảng, TLS, rate limiting, backup và giám sát riêng.

## Lệnh chính

| Lệnh                         | Công việc                                 |
| ---------------------------- | ----------------------------------------- |
| `npm run dev`                | Chạy development server                   |
| `npm run build`              | Build production và sitemap               |
| `npm start`                  | Chạy production build                     |
| `npm run generate:types`     | Sinh lại Payload types sau khi đổi schema |
| `npm run generate:importmap` | Cập nhật import map cho Payload Admin     |
| `npm run lint`               | Chạy ESLint                               |
| `npm run test:int`           | Chạy Vitest integration tests             |
| `npm run test:e2e`           | Chạy Playwright end-to-end tests          |

## Kiến trúc V2

```text
src/
├── app/
│   ├── (frontend)/[locale]/
│   │   ├── page.tsx             Homepage VI/EN
│   │   └── posts/               Danh sách, phân trang và chi tiết blog
│   └── (payload)/               Payload Admin, REST và GraphQL API
├── components/
│   └── WireframeHomepage/       Storytelling homepage gồm 10 content sections
├── collections/
│   ├── Posts/                   Bài blog
│   ├── Categories.ts            Chuyên mục blog
│   ├── Authors.ts               Hồ sơ tác giả public
│   ├── Media.ts                 Ảnh và tệp blog
│   └── Users/                   Tài khoản đăng nhập admin, không phải content
├── Header/Component.tsx         Navbar code-native
├── Footer/Component.tsx         Footer code-native
├── i18n/                        Locale và UI dictionary
└── payload.config.ts            Payload chỉ tập trung vào blog
```

Homepage marketing không được CMS hóa ở giai đoạn wireframe. Nội dung và placeholder
nằm trong `src/components/WireframeHomepage` để review hierarchy nhanh, không phụ thuộc
database ngoài ba bài Insights mới nhất.

## Tài liệu

- `docs/PRODUCT.md` — định hướng sản phẩm, nhóm người xem và các dữ kiện đã xác minh.
- `docs/DESIGN.md` — baseline wireframe và storytelling flow 12 phần của homepage.
- `docs/PLAN.md` — kế hoạch triển khai V2 theo từng giai đoạn.

## Lưu ý dữ liệu

V2 chuyển database adapter từ MongoDB sang PostgreSQL và thay quan hệ tác giả của Posts
từ `Users` sang `Authors`. Dữ liệu MongoDB cũ không được tự động chuyển sang PostgreSQL;
nếu cần giữ dữ liệu production phải thực hiện migration riêng. Các collection V1 không
còn được đăng ký trong Payload config.
