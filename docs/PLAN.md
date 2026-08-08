# Tensoract V2 Implementation Plan

## Trạng thái triển khai

- [x] Homepage code-native đủ 12 phần theo storytelling flow mới khi tính Navbar và Footer.
- [x] Wireframe responsive, không animation/3D/gradient và không sử dụng GSAP.
- [x] Payload content thu gọn còn Posts, Categories, Authors và Media.
- [x] Database adapter đã chuyển từ MongoDB sang PostgreSQL.
- [x] Users được giữ riêng cho xác thực Payload Admin.
- [x] Legacy Pages, Products, Releases, globals, seed, search và marketing blocks đã
  được gỡ khỏi runtime V2.
- [x] Payload types và Admin import map đã được sinh lại.
- [ ] Review nội dung và information hierarchy với stakeholder.
- [ ] Thay placeholder bằng dữ liệu đã xác minh.
- [ ] Chốt visual direction chi tiết sau khi wireframe được duyệt.

## Phạm vi

Xây lại homepage theo hướng skeleton/wireframe để review information architecture trước.
Không phát triển visual chi tiết, animation hoặc các trang phụ ngoài phần tối thiểu cần
cho navigation và blog trong giai đoạn này.

## Giai đoạn 1 — Tách nền tảng cũ

- Xác định component, CSS token, theme provider và block homepage thuộc design cũ.
- Giữ route, i18n và hạ tầng Payload cần thiết; không xóa dữ liệu trước khi có migration.
- Ngừng dùng CMS blocks để lắp homepage V2.
- Giữ GSAP trong dependency ở trạng thái chưa sử dụng; việc gỡ package sẽ quyết định
  sau để tránh trộn housekeeping với dựng wireframe.

## Giai đoạn 2 — Dựng skeleton homepage

- Tạo homepage bằng component code-native theo đúng flow 12 phần trong `DESIGN.md`.
- Dùng dữ liệu tĩnh có type rõ ràng cho Products, Traction, Milestones và các section
  còn lại.
- Dùng placeholder có nhãn cho dữ kiện và hình ảnh chưa được xác minh.
- Dựng navigation anchor/route rõ ràng và responsive layout cơ bản.

## Giai đoạn 3 — Thu gọn Payload CMS

- Payload chỉ quản lý Posts, Categories, Authors và Media.
- Thêm hoặc chuẩn hóa Authors collection; chuyển quan hệ tác giả bài viết về collection này.
- Gỡ Pages, Products, Releases, Header, Footer, form/search/redirect plugin khỏi config
  chỉ sau khi kiểm tra dependency và dữ liệu cần giữ.
- Insights trên homepage query ba bài published mới nhất và hỗ trợ VI/EN theo quyết định
  localization hiện hành.
- Sinh lại Payload types sau khi schema ổn định.

## Giai đoạn 4 — Review cấu trúc

- Review thứ tự section, độ dài nội dung, CTA và câu chuyện xuyên suốt từng nhóm người xem.
- Kiểm tra desktop, tablet và mobile; keyboard navigation và semantic heading.
- Thay đổi hierarchy dựa trên review trước khi chốt visual direction.

## Giai đoạn 5 — Visual design sau wireframe

- Chỉ bắt đầu sau khi cấu trúc được duyệt.
- Chốt typography, palette, imagery, component language và motion riêng cho V2.
- Animation là lớp tăng cường, không phải điều kiện để nội dung hoạt động.

## Ngoài phạm vi hiện tại

- 3D, GSAP animation, scroll storytelling phức tạp.
- Pitch-deck UI hoặc dashboard metric dày đặc.
- CMS hóa Hero, Products, Traction, Case Study, Milestones hoặc các section marketing.
- Tự tạo thêm section không có trong brief.

## Definition of Done cho vòng wireframe

- Homepage đủ 12 phần khi tính Navbar và Footer, đồng thời responsive.
- Payload blog hoạt động với bốn collection đã thống nhất.
- Không còn phụ thuộc runtime vào homepage CMS blocks cũ.
- Placeholder được nhận diện rõ và không bị hiểu nhầm là claim thật.
- Build, lint và các test liên quan vượt qua; test legacy được cập nhật hoặc loại bỏ có chủ đích.
