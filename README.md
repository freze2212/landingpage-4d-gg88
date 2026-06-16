# landingpage-4d-gg88

Landing page GG88 — static (Vite).

## Cấu hình link theo domain

Chỉnh file **`domain-links.json`** ở thư mục gốc:

```json
{
  "default": "https://www.gg8854.com/home/register?id=223462262",
  "domains": {
    "xxwin8.net": "https://www.gg8854.com/home/register?id=223462262",
    "ten-mien-moi.com": "https://link-dang-ky-cua-domain-nay.com/register?id=xxx"
  }
}
```

- **`default`**: link dùng khi domain chưa khai báo (localhost, domain mới chưa add).
- **`domains`**: mỗi domain trỏ về 1 link riêng. Ghi **không có www** (vd: `abc.com`). Cả `abc.com` và `www.abc.com` đều ăn cùng config.

### Cloudflare

1. Deploy 1 lần (Pages / hosting static).
2. Trên CF → **Custom Domains** → add domain mới trỏ về cùng project.
3. Thêm dòng domain + link vào `domain-links.json` → commit & deploy lại.
4. Khách mở đúng domain sẽ tự gắn link tương ứng (logo, 4 cổng, redirect 5s).

### Test local

```
http://localhost:5173/?domain=ten-mien-moi.com
```

## Chạy local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
