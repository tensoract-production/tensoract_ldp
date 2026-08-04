# Tensoract

Website giới thiệu công ty Tensoract Co., Ltd — Next.js 16 + Payload CMS 3, song ngữ
Việt / Anh, nội dung quản lý hoàn toàn trong CMS.

## Chạy tại máy

Cần Node `^18.20.2` hoặc `>=20.9.0`, và một MongoDB đang chạy.

```bash
# 1. Biến môi trường
cp .env.example .env
#    sửa DATABASE_URL, PAYLOAD_SECRET, PREVIEW_SECRET trong .env

# 2. MongoDB (dùng docker-compose có sẵn)
docker compose up -d mongo

# 3. Cài gói và chạy
npm install
npm run dev
```

Mở http://localhost:3000 — đường dẫn không có tiền tố ngôn ngữ sẽ tự chuyển sang `/vi`.

### Nạp nội dung mẫu

Lần đầu chạy, database trống. Vào http://localhost:3000/admin, tạo tài khoản quản trị
đầu tiên, rồi bấm nút **Seed your database** trên dashboard. Nó nạp toàn bộ trang, sản
phẩm, bài viết và cấu hình header/footer cho cả hai ngôn ngữ.

## Lệnh hay dùng

| Lệnh | Việc |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production (kèm sinh sitemap) |
| `npm start` | Chạy bản đã build |
| `npm run generate:types` | Sinh lại `src/payload-types.ts` sau khi đổi schema Payload |
| `npm run test:int` | Test tích hợp (Vitest) |
| `npm run test:e2e` | Test đầu-cuối (Playwright) |
| `npm run lint` | ESLint |

Đổi bất kỳ file nào trong `src/collections`, `src/blocks/*/config.ts`, `src/Header`,
`src/Footer` thì phải chạy lại `npm run generate:types`.

## Cấu trúc dự án

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── [locale]/          Toàn bộ trang công khai, dưới /vi và /en
│   │   │   ├── page.tsx           Trang chủ
│   │   │   ├── [slug]/            Trang tĩnh từ collection Pages
│   │   │   ├── products/          Danh sách và chi tiết sản phẩm
│   │   │   ├── posts/             Blog, có phân trang
│   │   │   └── search/            Tìm kiếm
│   │   ├── next/              Route preview, exit-preview, seed
│   │   ├── (sitemaps)/        sitemap XML cho pages và posts
│   │   └── globals.css        Design token và lớp nền tảng
│   └── (payload)/             Admin panel và REST/GraphQL API
│
├── collections/           Pages · Posts · Products · Media · Categories · Users
├── Header/ · Footer/      Hai global: cấu hình + component
│
├── blocks/                Block dựng trang, mỗi thư mục gồm config.ts + Component.tsx
│   ├── ManifestHero       Hero trang chủ
│   ├── ManifestStrip      Dòng chỉ số dạng chữ
│   ├── ProductLabels      Danh mục sản phẩm
│   ├── Approach           Cách làm việc
│   ├── Statement          Câu tuyên ngôn lớn
│   ├── Awards             Giải thưởng, có con dấu
│   ├── Partners           Đối tác
│   └── …                  CallToAction, Content, MediaBlock, Form, Archive
│
├── components/            Component dùng chung
│   ├── Woodblock          Bộ minh hoạ khắc gỗ dạng SVG
│   ├── Section            Khung section và tiêu đề
│   ├── ProductCard        Dòng sản phẩm trong danh mục
│   ├── Reveal             Hiệu ứng hiện dần khi cuộn
│   └── ui/                Nút, input, select… (shadcn)
│
├── i18n/                  Danh sách locale và từ điển chuỗi giao diện
├── endpoints/seed/        Script nạp nội dung mẫu song ngữ
├── utilities/             Truy vấn Payload, sinh href, metadata
├── proxy.ts               Chuyển hướng đường dẫn không tiền tố sang /vi
└── payload.config.ts      Cấu hình Payload, khai báo locale vi/en
```

### Vài điểm cần biết

**Song ngữ.** Mọi trang công khai nằm dưới `/[locale]`. Payload bật localization với
`vi` mặc định và `en` fallback về `vi` khi chưa dịch. Field nào cần dịch thì đánh
`localized: true` trong config — quên đánh thì bản tiếng Anh sẽ ghi đè bản tiếng Việt.

**Thêm block mới.** Tạo `src/blocks/TenBlock/{config.ts,Component.tsx}`, khai báo vào
mảng `blocks` trong `src/collections/Pages/index.ts`, đăng ký vào `blockComponents`
trong `src/blocks/RenderBlocks.tsx`, rồi chạy `generate:types`.

**Đường dẫn nội bộ.** Trong CMS cứ viết `/products`, không cần tiền tố ngôn ngữ —
`src/utilities/hrefFor.ts` tự thêm locale đang render.

## Tài liệu khác

- `docs/PRODUCT.md` — sự thật về sản phẩm và công ty: đối tượng, định vị, dữ kiện đã
  xác minh và dữ kiện cố tình để trống.
- `docs/DESIGN.md` — hệ thống thiết kế: bảng màu, thang chữ, nhịp khoảng cách.
