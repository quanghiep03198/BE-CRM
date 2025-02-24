# Git workflow guideline

## 1. Quy trình Git trong dự án

Trong quá trình phát triển sẽ sử dụng toàn bộ nhánh develop cho tới khi hoàn thiện mỗi phase, code sẽ được merge/rebase về nhánh main và cập nhật version một lần

**1.1 Clone repository**

```bash
git clone <repository_url>
```

**1.2 Pull code mới nhất trên nhánh develop**

```bash
git pull origin develop
```

**1.3 Tạo nhánh mới (feature, hotfix, refactor,...)**

```bash
git checkout -b <ten_nhanh_moi>
```

**1.4 Thực hiện thay đổi và commit**

```bash
git add .
git commit -m "Mô tả thay đổi"
```

**1.5 Đẩy nhánh lên remote**

```bash
git push origin <ten_nhanh_moi>
```

**1.6 Tạo Pull Request (PR)**

- Truy cập repository trên GitHub.
- Tạo Pull Request từ nhánh mới vừa đẩy lên.

**1.7 Code review và merge**

- Chờ đợi review từ các thành viên khác.
- Sau khi được chấp nhận, merge PR vào nhánh chính (main/develop).

**1.8 Cập nhật nhánh develop**

```bash
git checkout develop
git pull origin develop
```

**1.9 Xóa nhánh cũ (tùy chọn)**

```bash
git branch -d <ten_nhanh_moi>
git push origin --delete <ten_nhanh_moi>
```

## 2. Git commit convention

Để đảm bảo tính nhất quán và dễ hiểu trong lịch sử commit, chúng ta sẽ tuân theo các quy tắc commit sau:

**2.1 Cấu trúc commit**

```plaintext
<type>(<scope>): <subject>

<body>

<footer>
```

**2.2 Các loại commit (type)**

- **feat**: Một tính năng mới được thêm vào.
- **fix**: Sửa lỗi.
- **docs**: Thay đổi liên quan đến tài liệu.
- **style**: Thay đổi liên quan đến định dạng, không ảnh hưởng đến mã nguồn (ví dụ: khoảng trắng, dấu chấm phẩy, v.v.).
- **refactor**: Thay đổi mã nguồn mà không sửa lỗi hoặc thêm tính năng.
- **perf**: Thay đổi nhằm cải thiện hiệu suất.
- **test**: Thêm hoặc sửa các bài kiểm tra.
- **chore**: Thay đổi đối với quá trình xây dựng hoặc các công cụ phụ trợ và thư viện.

**2.3 Phạm vi commit (scope)**

Phạm vi là một phần tùy chọn, nhưng nó giúp xác định phần nào của mã nguồn bị ảnh hưởng bởi commit. Ví dụ: `feat(auth):`, `fix(api):`.

**2.4 Chủ đề commit (subject)**

Chủ đề là một dòng mô tả ngắn gọn về thay đổi. Nó phải:

- Viết ở thì hiện tại.
- Không viết hoa chữ cái đầu tiên.
- Không kết thúc bằng dấu chấm.

**2.5 Nội dung commit (body)**

Phần nội dung là tùy chọn và cung cấp mô tả chi tiết hơn về thay đổi. Nó nên bao gồm:

- Giải thích lý do cho thay đổi.
- Mô tả các tác động của thay đổi.

**2.6 Chân trang commit (footer)**

Phần chân trang cũng là tùy chọn và có thể được sử dụng để:

- Đóng các issue liên quan (ví dụ: `Closes #123`).
- Ghi chú về các thay đổi đột phá (breaking changes).

**Ví dụ về commit:**

```plaintext
feat(auth): thêm chức năng đăng nhập bằng Google

- Thêm nút đăng nhập bằng Google trên trang đăng nhập.
- Cập nhật API để hỗ trợ xác thực bằng Google.

Closes #45
```
