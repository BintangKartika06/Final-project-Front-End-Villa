# Final Project Front-End (Website Villa ABBA)

#### Deskripsi Umum
ABBA VILLA adalah sebuah platform web profil mewah yang dirancang untuk memberikan pengalaman reservasi villa secara eksklusif dan modern. Website ini mengusung tema "Luxury Retreat" dengan fokus pada estetika visual yang bersih, tipografi yang elegan, dan navigasi yang intuitif. Situs ini berfungsi sebagai gerai digital untuk menampilkan koleksi villa, fasilitas, serta sistem manajemen pemesanan sederhana.

## Daftar Anggota yang berkontribusi
**I Made Bintang Kartika Yasa** **(240040054)** [Link Profile Github](https://github.com/BintangKartika06)  
(Membuat repository project, membuat tampilan bentuk awal dari website dan Styling pemilihan warna, typografi dan layouting letak letak content dari villanya, membuat gambaran UI & UX untuk prototype sementara.)  

**I Made Agastya Wedastika** **(240040120)** [Link Profile Github](https://github.com/errondotsol)  
(Melakukan styling warna, mempercantik tampilan halaman website dan menambahkan gambar pada content di website dari gambar villa-villanya.)  

**I Gst.N.Pt Diana Putra Pratama** **(240040118)** [Link Profile Github](https://github.com/aristokragus)  
(Membuat proses routing di website ini yang dimana bertugas hanya dibagian route untuk melakukan ketika user ini `onclick` dia akan mengarah kemana.)  

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

Generator Kode Unik: Menghasilkan kode booking unik dengan format `"ABBA-XXXXX"` menggunakan kombinasi angka dan huruf acak setelah pemesanan berhasil.

Penyimpanan Data Lokal: Menyimpan detail pemesanan (nama, email, villa, total harga) ke dalam localStorage browser agar data tidak hilang.

###### 4. Fitur Pelacakan & Informasi
Cek Reservasi (Check Booking): Form khusus bagi tamu untuk memverifikasi status pemesanan mereka hanya dengan memasukkan kode booking unik.

Integrasi Kontak & Sosial: Footer menyediakan informasi lokasi lengkap, nomor telepon, email, serta tautan langsung ke Instagram, Facebook, dan WhatsApp.

###### 5. Efek Visual & Desain
Hover Zoom: Kartu villa memiliki efek perbesaran gambar yang halus saat kursor diarahkan ke atasnya.

Copy Code Tool: Tombol khusus untuk menyalin kode booking yang telah dihasilkan setelah proses pemesanan selesai.


# (User Flow) untuk website ABBA VILLA
### 1. Alur Kerja Sistem (System Workflow)
Website ini bekerja dengan konsep Single Page Application (SPA) sederhana.

Initial Load: Saat pertama kali dibuka, `index.html` memuat kerangka dasar (navbar & footer).

Routing: JavaScript (`router.js`) mendengarkan perubahan navigasi dan menyuntikkan konten ke dalam elemen 
```
<main id="app-content">  
```
tanpa memuat ulang browser.

Data Handling: Informasi villa diambil secara asinkron dari file JSON menggunakan Fetch API.

Data Persistence: Data reservasi disimpan secara lokal di browser menggunakan localStorage, sehingga informasi booking tetap ada meskipun halaman di-refresh.

### 2. Kegunaan Tombol-Tombol Utama
Tombol Navbar Toggler (Hamburger): Membuka dan menutup menu navigasi pada tampilan mobile dengan animasi garis yang berubah menjadi silang.

Tombol `"BOOK NOW"` (Navbar): Berfungsi sebagai _Call to Action_ utama yang mengarahkan pengguna langsung ke daftar seluruh villa yang tersedia.

Tombol `"LIHAT DETAIL"` (Card Villa): Mengarahkan pengguna ke halaman spesifik villa untuk melihat deskripsi lengkap, harga, dan fasilitas.

Tombol `"Book Now"` (Halaman Detail): Membawa ID villa terpilih menuju formulir pemesanan (halaman book).

Tombol Submit `"Confirm Booking"`: Memvalidasi input, menghitung total harga (harga + pajak 10%), menghasilkan kode unik, dan menyimpan data ke sistem.

Tombol `"Copy Code"`: Memungkinkan pengguna menyalin kode booking unik (ABBA-XXXXX) ke clipboard setelah transaksi berhasil.

### 3. Alur Pengguna (User Flow)
Website ini dirancang dengan alur linear yang memudahkan konversi tamu:

Discovery (Penemuan): Pengguna mendarat di Home, melihat ringkasan kemewahan villa, atau langsung mengklik menu Discover atau Villas.

Selection (Pemilihan): Pengguna menjelajahi katalog villa di halaman Villas atau berdasarkan kategori. Mereka melihat foto dan harga, lalu mengklik Lihat Detail pada villa yang menarik.

Information (Informasi): Di halaman detail, pengguna mempelajari fasilitas dan durasi menginap. Jika setuju, mereka mengklik tombol Book Now.

Transaction (Transaksi): * Pengguna mengisi nama dan email pada formulir booking.

Sistem menampilkan ringkasan biaya termasuk kalkulasi pajak otomatis.

Pengguna menekan konfirmasi dan mendapatkan Kode Booking unik.

Verification (Verifikasi): Di masa mendatang, pengguna kembali ke website, masuk ke menu Check Booking, memasukkan kode mereka, dan melihat status reservasi mereka kembali.


## Struktur Folder
```yaml
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


#### Link tautan GitHub Pages Website Villa ABBA  
[Github Pages](https://bintangkartika06.github.io/Final-project-Front-End-Villa/)
