# 🏨 Inn Horizon API

## Proyek
Inn Horizon adalah platform pemesanan hotel komprehensif yang dirancang untuk mendukung manajemen inventaris, transaksi *real-time*, dan fitur globalisasi dengan fokus pada **integritas finansial** dan **akuntabilitas (audit)**.

## ✨ Fitur Utama yang Didukung

### 1. Sistem Pengguna & Otoritas (1:M Model)
* **Peran Kunci:** Semua pengguna memiliki satu peran tunggal (`users.role_id`) yang ditentukan di tabel `roles` ('Admin', 'Host', atau 'Customer').
* **Akses Terstruktur:** Otoritas dikontrol ketat melalui `role_id` dan `hotels.owner_user_id`, memastikan setiap pengguna hanya mengakses data sesuai perannya.

### 2. Finansial & Legalitas (Comprehensive Coverage)
* **Kebijakan Pembatalan:** Dukungan untuk berbagai aturan pengembalian dana (`cancellation_policies`) yang mengikat pada hotel.
* **Manajemen Pajak:** Pengelolaan pajak dan biaya layanan (`taxes`, `hotel_taxes`) yang bervariasi per hotel dan menghitung `total_cost` secara akurat.
* **Promosi:** Dukungan diskon, kupon, dan manajemen *validity* (`discounts`).

### 3. Audit & Keamanan (Enterprise Grade)
* **System Logs Lengkap:** Tabel `system_logs` mencatat setiap aksi kritis.
    * **Konteks Keamanan:** Mencatat `ip_address` dan `user_agent` pelaku.
    * **Bukti:** Menyimpan `old_data` dan `new_data` dalam format JSON untuk audit forensik.
* **Soft Delete:** Penggunaan `deleted_at` di entitas utama untuk menjaga integritas transaksi lama.

### 4. Inventaris & Global
* **Inventaris Dinamis:** Pemisahan kamar (`rooms`) dan ketersediaan harian (`room_availability`) untuk mencegah *overbooking*.
* **Globalisasi:** Dukungan multibahasa (`hotel_translations`) dan akurasi lokasi (koordinat `latitude`/`longitude`).

## 🏗️ Struktur Database Kunci (Final)

Database menggunakan relasi **One-to-Many (1:M)** untuk peran pengguna dan pola **Many-to-Many (M:M)** untuk aset (Amenity, Tax, Policy).

| Kelompok Tabel      | Contoh Relasi Kunci                                                | Peran                                                     |
| :------------------ | :----------------------------------------------------------------- | :-------------------------------------------------------- |
| **Audit & Log**     | `system_logs.user_id`, `notifications.user_id`                     | Melacak siapa melakukan apa.                              |
| **Inventaris**      | `rooms.hotel_id`, `room_availability.room_id`                      | Menentukan ketersediaan dan harga per hari.               |
| **Finansial/Legal** | `bookings.status_id`, `hotel_taxes`, `hotel_cancellation_policies` | Mengelola harga, status, dan ketentuan pengembalian dana. |

---

## ⚠️ Panduan Pengembangan Lanjut

1.  **Otorisasi:** Logika *backend* harus memverifikasi `user_id` terhadap `hotels.owner_user_id` untuk setiap aksi `Host`.
2.  **Trigger:** Logika *backend* harus memicu entri ke tabel `system_logs` dan `notifications` pada setiap perubahan kritis (misalnya, perubahan `bookings.status_id`).
3.  **Seeding:** `countries`, `roles`, dan `statuses` harus diisi via *database seeding* sebelum aplikasi dijalankan.