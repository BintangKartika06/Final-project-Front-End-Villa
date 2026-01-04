document.addEventListener('DOMContentLoaded', function() {
    // STATE & CACHE 
    let cachedVillas = null; // Menyimpan data JSON agar tidak fetch berulang kali
    
    // DOM REFERENCES 
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    const collapseMenu = document.getElementById('navbarNav');
    
    // Update elemen DOM dengan aman (mencegah error null)
    function updateElement(id, property, value) {
        const el = document.getElementById(id);
        if (el) {
            if (property === 'style.backgroundImage') el.style.backgroundImage = value;
            else if (property === 'src') el.src = value;
            else el[property] = value;
        }
    }

    // Format angka ke mata uang USD
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    
    // Mengatur style navbar saat scroll atau menu mobile dibuka
    function updateNavbarStyle() {
        if (!navbar) return;
        
        const isMenuOpen = toggler && toggler.classList.contains('open');
        if (isMenuOpen) return; 

        const hasHero = document.querySelector('.hero-section');
        const scrollY = window.scrollY;

        // Navbar transparan hanya jika ada di atas halaman home/hero
        if (scrollY > 50 || !hasHero) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Menutup menu mobile secara otomatis
    function closeMobileMenu() {
        if (collapseMenu && collapseMenu.classList.contains('show')) {
            collapseMenu.classList.remove('show');
            navbar.classList.remove('menu-open');
            if (toggler) toggler.classList.remove('open');
            updateNavbarStyle();
        }
    }
    
    // Mengambil data villa dari file JSON
    async function getVillas() {
        if (cachedVillas) return cachedVillas;
        try {
            const res = await fetch('data/villas.json');
            cachedVillas = await res.json();
            return cachedVillas;
        } catch (err) {
            console.error("Data Fetch Error:", err);
            return [];
        }
    }


    window.addEventListener('scroll', updateNavbarStyle);

    // Toggle Menu Hamburger
    if (toggler) {
        toggler.addEventListener('click', function() {
            const willOpen = this.classList.toggle('open');
            if (willOpen) {
                collapseMenu.classList.add('show');
                navbar.classList.add('menu-open');
            } else {
                collapseMenu.classList.remove('show');
                navbar.classList.remove('menu-open');
                updateNavbarStyle();
            }
        });
    }

    // Menutup menu saat link navigasi diklik
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link') || e.target.closest('.btn-book-now')) {
            if (toggler && toggler.classList.contains('open')) {
                toggler.click(); 
            }
        }
    });

    // Mendeteksi saat Router selesai memuat halaman baru
    document.addEventListener('router:loaded', async function(e) {
        const { page, data } = e.detail;

        closeMobileMenu();
        setTimeout(updateNavbarStyle, 50);

        // Render konten spesifik berdasarkan halaman
        switch (page) {
            case 'villas': renderAllVillas(); break;
            case 'category': renderCategoryPage(data); break;
            case 'detail': await renderDetail(data); break;
            case 'book': await renderBooking(data); break;
            case 'check-booking': initCheckBooking(); break;
        }
    });

    //Fitur Logika Rendering
    async function renderDetail(villaId) {
        if (!villaId) return;
        const villas = await getVillas();
        const villa = villas.find(v => v.id === villaId);

        if (villa) {
            updateElement('detail-hero', 'style.backgroundImage', `url('${villa.image}')`);
            updateElement('detail-title', 'textContent', villa.title);
            updateElement('detail-duration', 'textContent', villa.duration);
            updateElement('detail-price', 'textContent', villa.price);
            updateElement('detail-desc', 'textContent', villa.description);
            
            const iconEl = document.getElementById('detail-icon');
            if(iconEl) iconEl.className = `bi display-4 ${villa.icon}`;

            // Render daftar fasilitas
            const listEl = document.getElementById('detail-features');
            if(listEl) {
                listEl.innerHTML = villa.features
                    .map(f => `<li class="mb-2"><i class="bi bi-check-circle me-2 text-success"></i>${f}</li>`)
                    .join('');
            }

            const bookBtn = document.getElementById('btn-book-now');
            if(bookBtn) bookBtn.onclick = () => navigateTo('book', villa.id);
        }
    }

    async function renderBooking(villaId) {
        if (!villaId) {
            alert("Silakan pilih villa terlebih dahulu.");
            navigateTo('villas');
            return;
        }

        const villas = await getVillas();
        const villa = villas.find(v => v.id === villaId);

        if (villa) {
            updateElement('summary-img', 'src', villa.image);
            updateElement('summary-title', 'textContent', villa.title);
            updateElement('summary-category', 'textContent', villa.category);
            
            // Kalkulasi Total Harga + Pajak
            const rawPrice = parseFloat(villa.price.replace(/[^0-9.-]+/g,"")); 
            const tax = rawPrice * 0.1;
            const total = rawPrice + tax;

            updateElement('summary-price', 'textContent', formatCurrency(rawPrice));
            updateElement('summary-tax', 'textContent', formatCurrency(tax));
            updateElement('summary-total', 'textContent', formatCurrency(total));

            // Form Submission
            const form = document.getElementById('bookingForm');
            if(form) {
                form.onsubmit = function(e) {
                    e.preventDefault();
                    processBooking(villa, total);
                };
            }
        }
    }
    
    // Fitur Booking Villa
    function processBooking(villa, total) {
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const uniqueCode = 'ABBA-' + Math.random().toString(36).substr(2, 5).toUpperCase();

        const bookingData = {
            code: uniqueCode,
            villa: villa.title,
            customer: firstName,
            email: email,
            total: formatCurrency(total),
            status: 'Confirmed'
        };

        // Simpan ke LocalStorage
        let allBookings = JSON.parse(localStorage.getItem('abbaBookings')) || [];
        allBookings.push(bookingData);
        localStorage.setItem('abbaBookings', JSON.stringify(allBookings));

        // Tampilkan Sukses
        document.getElementById('booking-container').classList.add('d-none');
        document.getElementById('booking-success').classList.remove('d-none');
        document.getElementById('success-code').textContent = uniqueCode;
        window.scrollTo(0,0);
    }

    // Fitur Check Booking dengan kode unik
    function initCheckBooking() {
        const checkForm = document.getElementById('checkBookingForm');
        if (!checkForm) return;

        checkForm.onsubmit = function(e) {
            e.preventDefault();
            const codeInput = document.getElementById('bookingCodeInput').value.trim().toUpperCase();
            const allBookings = JSON.parse(localStorage.getItem('abbaBookings')) || [];
            const found = allBookings.find(b => b.code === codeInput);

            const resultDiv = document.getElementById('bookingResult');
            const errorDiv = document.getElementById('bookingError');

            if (found) {
                resultDiv.classList.remove('d-none');
                errorDiv.classList.add('d-none');
                updateElement('resultName', 'textContent', found.customer);
                updateElement('resultVilla', 'textContent', found.villa);
                updateElement('resultStatus', 'textContent', found.status);
                updateElement('resultTotal', 'textContent', found.total);
            } else {
                resultDiv.classList.add('d-none');
                errorDiv.classList.remove('d-none');
            }
        };
    }

    // Fitur Membagi villa dengan kategori tertentu

    async function renderCategoryPage(categoryName) {
        const container = document.getElementById('category-list-container');
        if (!container) return;
        
        const safeCategory = categoryName || "Exclusive"; 
        updateElement('category-title', 'innerText', `${safeCategory} Collection`);
        updateElement('category-desc', 'innerText', `Menampilkan pilihan villa terbaik di kategori ${safeCategory}`);
        
        const villas = await getVillas();
        const filteredVillas = villas.filter(v => v.category === safeCategory);
        renderVillaGrid(container, filteredVillas);
    }

    async function renderAllVillas() {
        const container = document.getElementById('all-villas-container');
        if (!container) return;
        const villas = await getVillas();
        renderVillaGrid(container, villas, true);
    }

    function renderVillaGrid(container, dataVillas, showBadge = false) {
        if(dataVillas.length === 0) {
            container.innerHTML = '<p class="text-center w-100 text-muted">Belum ada villa tersedia saat ini.</p>';
            return;
        }

        container.innerHTML = dataVillas.map(villa => `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm package-card" style="cursor:pointer;" onclick="navigateTo('detail', '${villa.id}')">
                    <div style="height: 250px; overflow:hidden; position:relative;">
                        <img src="${villa.image}" class="w-100 h-100" style="object-fit:cover;">
                        ${showBadge ? `<span class="badge bg-dark position-absolute top-0 start-0 m-3">${villa.category}</span>` : ''}
                    </div>
                    <div class="card-body text-center">
                        <h5 class="serif-text mt-2">${villa.title}</h5>
                        <p class="small text-muted mb-2">${villa.duration}</p>
                        <h6 style="color:#CCA075;">${villa.price}</h6>
                        <button class="btn btn-sm btn-outline-dark mt-3 w-100">LIHAT DETAIL</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Menjalankan router saat website pertama kali dibuka
    if (window.navigateTo) {
        const hash = window.location.hash.substring(1); 
        if (hash) {
            let savedData = sessionStorage.getItem('params_' + hash);
            try { savedData = JSON.parse(savedData); } catch(e) {}
            window.navigateTo(hash, savedData);
        } else {
            window.navigateTo('home');
        }
    }
});

//Fitur Copy Code setelah berhasil booking
window.copyBookingCode = function(btnElement) {
    const codeElement = document.getElementById('success-code');
    if (!codeElement) return; 
    
    const codeText = codeElement.textContent.trim();
    navigator.clipboard.writeText(codeText).then(() => {
        // Feedback Visual (Mengubah icon sementara)
        btnElement.innerHTML = '<i class="bi bi-check-lg fs-5"></i>';
        btnElement.classList.replace('btn-outline-secondary', 'btn-success');
        
        setTimeout(() => {
            btnElement.innerHTML = '<i class="bi bi-files fs-5"></i>'; 
            btnElement.classList.replace('btn-success', 'btn-outline-secondary');
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
        alert('Gagal menyalin otomatis. Kode: ' + codeText);
    });
};

//Gallery Modal
window.openGalleryModal = function(src) {
    const img = document.getElementById('galleryModalImg');
    const modal = document.getElementById('galleryModal');
    if(img && modal) {
        img.src = src;
        modal.style.display = 'flex';
    }
}

window.closeGalleryModal = function() {
    const modal = document.getElementById('galleryModal');
    if(modal) modal.style.display = 'none';
}