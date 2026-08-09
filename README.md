# Tensoract

## Yêu cầu

- Docker và Docker Compose; hoặc Node.js `>=20.9.0` nếu chạy ứng dụng trực tiếp.
- PostgreSQL 16.

## Chuẩn bị biến môi trường

```bash
cp .env.example .env
```

Điền các biến còn trống trong `.env`. Tạo một giá trị khác nhau cho từng secret bằng:

```bash
openssl rand -hex 32
```

## Chạy bằng Docker

```bash
docker compose up --build -d
```

Kiểm tra trạng thái và xem log:

```bash
docker compose ps
docker compose logs -f payload
```

Mở ứng dụng tại http://localhost:3000 và Payload Admin tại
http://localhost:3000/admin.

Dừng dự án:

```bash
docker compose down
```

Thêm `--volumes` nếu muốn xóa cả dữ liệu PostgreSQL và media local:

```bash
docker compose down --volumes
```

## Chạy ứng dụng trực tiếp bằng Node.js

Đặt `DATABASE_URL` trong `.env`, ví dụ:

```text
postgresql://payload:YOUR_POSTGRES_PASSWORD@127.0.0.1:5432/tensoract
```

Khởi động PostgreSQL, cài dependency và chạy development server:

```bash
docker compose up -d postgres
npm ci
npm run dev
```
