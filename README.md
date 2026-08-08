# Tensoract

Website công ty Tensoract — Next.js 16 + Payload CMS 3, song ngữ Việt/Anh.

Branch `des_v1` hiện chứa V2 wireframe: homepage code-native ưu tiên cấu trúc nội dung;
Payload chỉ quản lý blog.

## Chạy tại máy

Cần Node `^18.20.2` hoặc `>=20.9.0` và PostgreSQL.

```bash
cp .env.example .env
docker compose up -d postgres
npm install
npm run dev
```

Mở http://localhost:3000. Route không có locale tự chuyển sang `/vi`.
Payload Admin nằm tại http://localhost:3000/admin.

## Lệnh chính

| Lệnh | Công việc |
|---|---|
| `npm run dev` | Chạy development server |
| `npm run build` | Build production và sitemap |
| `npm start` | Chạy production build |
| `npm run generate:types` | Sinh lại Payload types sau khi đổi schema |
| `npm run generate:importmap` | Cập nhật import map cho Payload Admin |
| `npm run lint` | Chạy ESLint |
| `npm run test:int` | Chạy Vitest integration tests |
| `npm run test:e2e` | Chạy Playwright end-to-end tests |

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
