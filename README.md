# Final Project Front-End (Website Villa ABBA)

#### Deskripsi Umum
ABBA VILLA adalah sebuah platform web profil mewah yang dirancang untuk memberikan pengalaman reservasi villa secara eksklusif dan modern. Website ini mengusung tema "Luxury Retreat" dengan fokus pada estetika visual yang bersih, tipografi yang elegan, dan navigasi yang intuitif. Situs ini berfungsi sebagai gerai digital untuk menampilkan koleksi villa, fasilitas, serta sistem manajemen pemesanan sederhana.

## Daftar Anggota yang berkontribusi
I Made Bintang Kartika Yasa (240040054)

I Made Agastya Wedastika (240040120)

I Gst.N.Pt Diana Putra Pratama (240040118)

## Teknologi Yang Digunakan
#### Frontend & UI Frameworks

HTML5: Digunakan sebagai fondasi utama untuk membangun struktur dokumen web yang semantik dan terorganisir.

CSS3: Digunakan untuk kustomisasi gaya visual, termasuk penggunaan transisi cubic-bezier, transformasi elemen, dan efek overlay pada gambar.

Bootstrap 5.3.0: Framework CSS utama yang digunakan untuk sistem grid yang responsif dan komponen UI seperti navbar serta tombol.

Bootstrap Icons: Digunakan untuk menyediakan elemen visual ikonik seperti ikon lokasi, telepon, dan media sosial.

Google Fonts: Mengintegrasikan font Playfair Display untuk kesan klasik/mewah dan Poppins untuk keterbacaan modern.

#### Bahasa Pemograman & Logika
Vanilla JavaScript (ES6+): Seluruh logika interaktivitas, mulai dari manipulasi DOM hingga manajemen state, ditulis menggunakan JavaScript murni tanpa bantuan library berat seperti jQuery.

Asynchronous JavaScript (Async/Await): Digunakan untuk mengambil data eksternal secara non-blocking, sehingga website tetap responsif saat memuat informasi villa.

Fetch API: Digunakan untuk melakukan request data ke file villas.json sebagai basis data katalog villa.

#### Arsitektur & Penyimpenan Data
Single Page Application (SPA) Routing: Menggunakan sistem router kustom (via router.js) yang memungkinkan perpindahan halaman secara dinamis tanpa memuat ulang (reload) browser.

JSON (JavaScript Object Notation): Digunakan sebagai format pertukaran data untuk menyimpan informasi detail villa seperti harga, fasilitas, dan gambar.

Web Storage API (LocalStorage): Digunakan untuk menyimpan data reservasi tamu secara persisten di sisi klien, sehingga data "Check Booking" tetap tersedia meski halaman disegarkan.

#### Desain & UX (User Experience)
Responsive Web Design (RWD): Memanfaatkan sistem grid Bootstrap untuk memastikan tampilan tetap optimal baik di perangkat desktop maupun mobile.

Event-Driven Interaction: Menggunakan Event Listeners untuk menangani aksi pengguna seperti scroll (untuk efek perubahan warna navbar) dan klik tombol menu.

Dynamic Rendering: Konten halaman dihasilkan secara dinamis berdasarkan input user, seperti kalkulasi pajak otomatis dan pembuatan kode booking unik.

## Beberapa Fitur yang ada dalam Website
###### 1. Navigasi dan Antarmuka Dinamis
Sticky Navbar: Menu navigasi tetap berada di atas dan berubah warna (menjadi putih dengan bayangan) saat pengguna menggulir halaman ke bawah.

Menu Mobile Responsif: Menggunakan tombol hamburger kustom yang berubah menjadi tanda silang saat dibuka dan secara otomatis menutup ketika sebuah menu diklik.

Single Page Application (SPA): Perpindahan antar halaman dilakukan tanpa memuat ulang (reload) browser dengan menyuntikkan konten ke dalam elemen kontainer utama.

###### 2. Manajemen Katalog Villa
Katalog Villa Otomatis: Menampilkan daftar villa secara dinamis dalam bentuk grid yang diambil dari sumber data JSON.

Filter Kategori: Fitur untuk menampilkan koleksi villa berdasarkan kategori tertentu, seperti "Exclusive Collection".

Halaman Detail Villa: Menampilkan informasi mendalam untuk setiap villa, termasuk gambar, deskripsi, harga per durasi, dan daftar fasilitas spesifik.

###### 3. Sistem Pemesanan (Booking)
Kalkulasi Harga Otomatis: Menghitung biaya pajak sebesar 10% dari harga dasar dan menjumlahkannya menjadi total biaya secara otomatis.

Generator Kode Unik: Menghasilkan kode booking unik dengan format "ABBA-XXXXX" menggunakan kombinasi angka dan huruf acak setelah pemesanan berhasil.

Penyimpanan Data Lokal: Menyimpan detail pemesanan (nama, email, villa, total harga) ke dalam localStorage browser agar data tidak hilang.

###### 4. Fitur Pelacakan & Informasi
Cek Reservasi (Check Booking): Form khusus bagi tamu untuk memverifikasi status pemesanan mereka hanya dengan memasukkan kode booking unik.

Integrasi Kontak & Sosial: Footer menyediakan informasi lokasi lengkap, nomor telepon, email, serta tautan langsung ke Instagram, Facebook, dan WhatsApp.

###### 5. Efek Visual & Desain
Hover Zoom: Kartu villa memiliki efek perbesaran gambar yang halus saat kursor diarahkan ke atasnya.

Copy Code Tool: Tombol khusus untuk menyalin kode booking yang telah dihasilkan setelah proses pemesanan selesai.



## Struktur Folder
```diff
.
└── PROJECT AKHIR FRONTEND VILLA/
    ├── css/
    │   └── style.css
    ├── data/
    │   └── villas.json
    ├── js/
    │   └── script.js
    ├── lib
    ├── Media/
    │   └── #Seluruh Gambar yang terdapat pada website
    ├── pages/
    │   ├── booking.html
    │   ├── category.html
    │   ├── check-booking.html
    │   ├── contact.html
    │   ├── detail.html
    │   ├── discover.html
    │   ├── facility.html
    │   ├── gallery.html
    │   ├── home.html
    │   ├── reviews.html
    │   └── villas.html
    ├── routes/
    │   └── router.js
    ├── index.html
    └── README.md
```



[Github Pages]
