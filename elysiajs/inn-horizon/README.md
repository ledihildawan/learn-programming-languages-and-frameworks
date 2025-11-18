# 🏨 Inn Horizon API

## Proyek
Inn Horizon adalah platform pemesanan hotel komprehensif yang dirancang untuk mendukung manajemen inventaris, transaksi *real-time*, dan fitur globalisasi (multibahasa dan data geografis) dengan fokus pada akuntabilitas dan audit.

## ✨ Fitur Utama

### 1. Sistem Pengguna Multi-Peran
* **Customer:** Pencarian, pemesanan, *wishlist*, dan ulasan.
* **Host/Owner:** Manajemen properti (`hotels.owner_user_id`), inventaris kamar, dan harga dinamis.
* **Admin/Super User:** Kontrol penuh atas data master dan audit sistem (`users.is_admin = TRUE`).

### 2. Inventaris dan Transaksi Solid
* **Manajemen Inventaris:** Pemisahan kamar (`rooms`) dan ketersediaan harian (`room_availability`) untuk mencegah *overbooking*.
* **Keuangan:** Dukungan untuk diskon (`discounts`), kupon, dan pencatatan transaksi pembayaran mendalam (`payments`).
* **Audit Trail:** Pelacakan aktivitas pengguna melalui `system_logs` dan `deleted_at` (Soft Delete) di entitas utama.

### 3. Global & UX
* **Globalisasi:** Dukungan multibahasa (`hotel_translations`) dan data geografis terstandarisasi.
* **Akurasi Lokasi:** Penggunaan koordinat (`latitude`, `longitude`) untuk integrasi peta.
* **Komunikasi:** Sistem notifikasi (`notifications`) *real-time* untuk Host dan Customer.

## 🏗️ Struktur Database (ERD)

Database ini dibangun dengan prinsip normalisasi yang tinggi dan memisahkan data berdasarkan fungsi:

### Kelompok Entitas
1.  **Entitas Utama:** `users`, `hotels`, `rooms`.
2.  **Transaksi:** `bookings`, `payments`, `reviews`.
3.  **Master Data:** `countries`, `cities`, `amenities`, `statuses`, `languages`.

### Relasi Kunci (Foreign Keys)
* **Pemilik Properti:** `hotels` terhubung ke `users` melalui `owner_user_id`.
* **Lokalisasi:** `hotel_translations` menghubungkan `hotels` dengan `languages`.
* **Inventaris:** `room_availability` terhubung ke `rooms`.
* **Audit:** `system_logs` dan `notifications` terhubung ke `users`.

## 🛠️ Panduan Pengembangan Awal (Bootstrap)

Untuk menginisialisasi sistem ini, tabel harus dibuat berdasarkan urutan ketergantungan:

### Fase I: Persiapan Keamanan & Master Data Dasar
1.  `countries` (Wajib diisi/seeding pertama kali)
2.  `users` (Buat Super Admin pertama)
3.  `system_logs` (Aktifkan pencatatan)
4.  `cities`, `languages`, `statuses`, `payment_methods`, `amenities`, `hotel_types`, `discounts`

### Fase II: Inventaris & Properti
1.  `hotels`
2.  `rooms`, `room_photos`, `room_amenities` (dan tabel penghubungnya)
3.  `room_availability`, `user_wishlist`, `hotel_translations`

### Fase III: Transaksi & Audit
1.  `bookings`
2.  `payments`, `booking_discounts`
3.  `reviews`, `review_replies`, `notifications`

## 🛡️ Aturan Integritas Data (Wajib Impelementasi)

Pastikan aturan ini diterapkan di *backend* dan *database* Anda:

| Aturan                | Tabel yang Terlibat                                                                       | Logika                                                                                                                        |
| :-------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Soft Delete**       | `users`, `hotels`, `rooms`                                                                | Gunakan kolom `deleted_at` (TIMESTAMP) daripada `HARD DELETE` untuk menjaga integritas FK.                                    |
| **Unique Constraint** | `users.email`, `room_availability` (`room_id`, `date`), `reviews` (`hotel_id`, `user_id`) | Mencegah duplikasi data kritis (akun ganda, *overbooking*, ulasan ganda).                                                     |
| **ON DELETE CASCADE** | `room_photos`, `hotel_amenities`, `room_room_amenities`                                   | Jika entitas induk (misalnya `rooms`) dihapus secara permanen, detailnya (misalnya `room_photos`) harus otomatis dihapus.     |
| **Otorisasi Host**    | *Backend Logic*                                                                           | Host hanya boleh memodifikasi data `hotels`, `rooms`, atau `room_availability` di mana `owner_user_id` sama dengan ID mereka. |