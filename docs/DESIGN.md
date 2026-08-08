# Tensoract Design V2 — Wireframe Baseline

## Trạng thái

Thiết kế hiện có trong code là phiên bản cũ và không còn là định hướng cho V2. V2 bắt
đầu bằng một wireframe sạch, ưu tiên cấu trúc nội dung và information hierarchy trước
khi phát triển visual design. Đặc tả cũ vẫn có thể tra cứu trong lịch sử Git.

## Mục tiêu

Homepage phải giúp khách hàng, đối tác, nhà đầu tư, ứng viên và người đang tìm hiểu
Tensoract nhanh chóng hiểu được:

- Tensoract là công ty công nghệ/SaaS xây dựng sản phẩm thực tế.
- Ecombox là sản phẩm nổi bật trong một hệ sinh thái sản phẩm thống nhất.
- Công ty có traction, năng lực triển khai, hướng phát triển và tầm nhìn dài hạn.
- Người xem có thể tiếp tục tìm hiểu sản phẩm, công ty, cơ hội nghề nghiệp hoặc bắt
  đầu một cuộc trao đổi.

Website cần đủ thuyết phục trong bối cảnh công ty đang gọi vốn nhưng không được trình
bày như pitch deck.

## Nguyên tắc phiên bản wireframe

- Clean, modern, mang ngữ cảnh technology/SaaS.
- Typography rõ ràng, nhiều khoảng trắng và hierarchy dễ quét.
- Responsive từ đầu; ưu tiên một cột rõ ràng trên mobile.
- Chỉ dùng màu trung tính và placeholder cần thiết để kiểm tra bố cục.
- Không animation phức tạp, 3D, gradient hoặc hiệu ứng trang trí cầu kỳ.
- Không dùng GSAP trong phiên bản này.
- Không kế thừa token màu, typography, illustration hoặc layout của thiết kế cũ.
- Không tự thêm section ngoài cấu trúc đã thống nhất.

## Cấu trúc homepage

1. **Navbar** — Logo Tensoract; Products; About; Careers; Contact; nút Blog dẫn tới
   trang Insights riêng.
2. **Hero** — Tensoract là ai, đang xây gì, hai CTA chính và dải đối tác/tổ chức đồng hành.
3. **About Tensoract** — Giới thiệu ngắn; Founded, Focus, Based in; dẫn sang Ecombox.
4. **Flagship Product — Ecombox** — Vấn đề, năng lực chính và product showcase.
5. **Awards & Recognition** — Chỉ công bố giải thưởng/chương trình đã xác minh.
6. **Journey** — 2022–2026, chọn các milestone thật sự thay đổi công ty.
7. **Leadership** — 3–5 vai trò chủ chốt đã xác nhận, không giả làm danh sách toàn team.
8. **Vision / Next Chapter** — Hướng phát triển tại Việt Nam và Đông Nam Á.
9. **Insights** — Ba bài blog mới nhất từ Payload CMS.
10. **Careers** — Giới thiệu ngắn về cơ hội làm việc.
11. **Investor / Partnership CTA** — Mời investor hoặc đối tác trao đổi.
12. **Footer**.

## Nội dung chưa xác minh

Số liệu traction, case study, partner, URL sản phẩm và nội dung chưa được cung cấp phải
hiển thị bằng placeholder có nhãn trong quá trình review. Không biến placeholder thành
public claim và không tự viết số liệu để lấp chỗ trống.

## Tiêu chí hoàn thành wireframe

- Có đủ 12 phần theo đúng thứ tự và mục đích.
- Mỗi section có heading, nội dung mẫu tối thiểu và CTA/điểm chuyển tiếp khi cần.
- Desktop và mobile đều có hierarchy rõ, không overflow hoặc phụ thuộc hiệu ứng.
- Ba bài Insights lấy từ Payload, có empty state khi chưa có bài.
- Reviewer có thể đánh giá toàn bộ câu chuyện của homepage mà không cần visual hoàn thiện.
