# Book Database Comparison (SQL vs NoSQL)

Dự án này là một API NestJS dùng để so sánh hiệu quả thực tế và các quyết định thiết kế giữa hệ cơ sở dữ liệu quan hệ SQL (PostgreSQL dùng TypeORM) và phi quan hệ NoSQL (MongoDB dùng Mongoose).

## Database Setup

1. Khởi động PostgreSQL và MongoDB bằng Docker Compose:
   ```bash
   npm run db:up
   ```
2. Tắt các container cơ sở dữ liệu:
   ```bash
   npm run db:down
   ```

## Installation & Running

```bash
$ npm install
$ npm run build
$ npm run start:dev
```

## API Endpoints

### SQL Books (PostgreSQL + TypeORM)
- **POST** `/sql/books`: Tạo sách mới cùng tác giả (tự động tạo tác giả nếu chưa tồn tại). Ngăn chặn trùng lặp bộ `title` + `author`.
- **GET** `/sql/books`: Lấy tất cả sách kèm theo chi tiết tác giả thông qua quan hệ `ManyToOne` (JOIN).
- **GET** `/sql/books/:id`: Lấy chi tiết sách theo ID cụ thể.

### NoSQL Books (MongoDB + Mongoose)
- **POST** `/nosql/books`: Tạo sách mới với thuộc tính mở rộng linh hoạt `tags` (mảng) và `metadata` (đối tượng động).
- **GET** `/nosql/books`: Lấy tất cả sách NoSQL, hỗ trợ lọc động qua query params `tag`, `metaKey`, `metaValue`.
- **GET** `/nosql/books/:id`: Lấy chi tiết sách NoSQL theo ID.

---

## So sánh SQL vs NoSQL (SQL vs NoSQL Comparison)

### Bảng so sánh tổng quan
| Đặc tính | SQL (PostgreSQL) | NoSQL (MongoDB) |
|---|---|---|
| **Mô hình dữ liệu** | Bảng có cấu trúc chặt chẽ (Schema-based) | Tài liệu BSON linh hoạt (Schema-less/Mixed) |
| **Quan hệ** | Liên kết thông qua khóa ngoại (Foreign Keys) và `JOIN` | Nhúng trực tiếp (Embedding) hoặc liên kết lỏng lẻo |
| **Tính nhất quán** | Tuân thủ ACID rất nghiêm ngặt | Tính nhất quán cuối cùng (Eventual Consistency) |
| **Khả năng mở rộng** | Mở rộng theo chiều dọc (Scale-up) | Mở rộng theo chiều ngang tốt (Scale-out / Sharding) |
| **Cú pháp truy vấn** | Ngôn ngữ SQL chuẩn hóa | MQL (MongoDB Query Language) |

### Phân tích chi tiết & Dẫn chứng
Dựa trên trải nghiệm triển khai hai luồng nghiệp vụ sách:

1. **Trường hợp ưu tiên SQL**:
   Nên ưu tiên SQL khi ứng dụng yêu cầu tính toàn vẹn dữ liệu cao và có các mối quan hệ phức tạp như quan hệ giữa `Book` và `Author`. Với SQL, ta có thể dễ dàng liên kết tác giả bằng khóa ngoại và dùng `JOIN` để lấy thông tin đồng bộ mà không sợ dữ liệu bị mâu thuẫn. Ví dụ, kết quả gọi API `GET /sql/books/1` trả về chính xác cấu trúc quan hệ chuẩn hóa:
   ```json
   {
     "id": 1,
     "title": "Clean Code",
     "author": { "id": 1, "name": "Robert C. Martin" }
   }
   ```
2. **Trường hợp ưu tiên NoSQL**:
   Nên ưu tiên NoSQL khi dữ liệu có cấu trúc không đồng nhất, thường xuyên thay đổi hoặc yêu cầu lưu trữ các thuộc tính linh hoạt (tùy biến theo từng cuốn sách). Với MongoDB, việc bổ sung trường `tags` và `metadata` được thực hiện trực tiếp mà không cần chạy migration thay đổi cấu trúc bảng như SQL. Ví dụ, API `GET /nosql/books` cho phép trả về các metadata động khác biệt giữa các cuốn sách khác nhau một cách dễ dàng:
   ```json
   {
     "id": "60d5ec4b8f1b2c3d4e5f6a7b",
     "title": "MongoDB The Definitive Guide",
     "author": { "id": null, "name": "Shannon Bradshaw" },
     "tags": ["database", "nosql"],
     "metadata": { "publisher": "O Reilly Media", "edition": "3rd" }
   }
   ```
3. **Trade-offs (Đánh đổi) khi bảo trì lâu dài**:
   - **Bảo trì SQL**: Việc bảo trì SQL đòi hỏi quản lý chặt chẽ các tệp Migration mỗi khi thay đổi cấu trúc dữ liệu. Khi cơ sở dữ liệu lớn dần, các câu lệnh `JOIN` phức tạp qua nhiều bảng có thể gặp vấn đề hiệu năng nếu không đánh index tốt. Tuy nhiên, tính toàn vẹn dữ liệu được đảm bảo tuyệt đối bởi tầng Database.
   - **Bảo trì NoSQL**: Cực kỳ dễ dàng trong việc thay đổi cấu trúc dữ liệu ban đầu vì MongoDB chấp nhận dữ liệu Schema-less. Tuy nhiên, sự linh hoạt này đi kèm với nguy cơ "dữ liệu rác" khi không có sự kiểm soát từ cơ sở dữ liệu. Việc chuẩn hóa và làm sạch dữ liệu cũ phải được thực hiện hoàn toàn ở tầng mã nguồn ứng dụng, gây khó khăn cho việc duy trì tính nhất quán khi dự án phát triển lâu dài.
