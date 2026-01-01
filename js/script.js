document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    const collapseMenu = document.getElementById('navbarNav');

    if (toggler) {
        toggler.addEventListener('click', function() {
            const isOpen = this.classList.toggle('open');
            
            if (isOpen) {
                collapseMenu.classList.add('show');
                navbar.classList.add('menu-open');
            } else {
                collapseMenu.classList.remove('show');
                setTimeout(() => {
                    if (window.scrollY < 50) {
                        navbar.classList.remove('menu-open');
                    }
                }, 600);
            }
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (toggler.classList.contains('open')) {
                toggler.click();
            }
        });
    });

    window.addEventListener('scroll', () => {
        if (toggler && toggler.classList.contains('open')) return;
        const hasHero = document.querySelector('.hero-section');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            if (hasHero) navbar.classList.remove('scrolled');
            else navbar.classList.add('scrolled');
        }
    });

    async function getVillas() {
        if (cachedVillas) return cachedVillas;
        try {
            const res = await fetch('data/villas.json');
            cachedVillas = await res.json();
            return cachedVillas;
        } catch (err) {
            console.error(err);
            return [];
        }
    }

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

            const listEl = document.getElementById('detail-features');
            if(listEl) {
                listEl.innerHTML = villa.features
                    .map(f => `<li class="mb-2"><i class="bi bi-check-circle me-2 text-success"></i>${f}</li>`)
                    .join('');
            }

            const bookBtn = document.getElementById('btn-book-now');
            if(bookBtn) {
                bookBtn.onclick = () => navigateTo('book', villa.id);
            }
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
            document.getElementById('summary-img').src = villa.image;
            updateElement('summary-title', 'textContent', villa.title);
            updateElement('summary-category', 'textContent', villa.category);
            
            const rawPrice = parseFloat(villa.price.replace(/[^0-9.-]+/g,"")); 
            const tax = rawPrice * 0.1;
            const total = rawPrice + tax;
            const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

            updateElement('summary-price', 'textContent', formatter.format(rawPrice));
            updateElement('summary-tax', 'textContent', formatter.format(tax));
            updateElement('summary-total', 'textContent', formatter.format(total));

            const form = document.getElementById('bookingForm');
            if(form) {
                form.onsubmit = function(e) {
                    e.preventDefault();
                    processBooking(villa, total, formatter);
                };
            }
        }
    }

    function processBooking(villa, total, formatter) {
        const firstName = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        const uniqueCode = 'ABBA-' + Math.random().toString(36).substr(2, 5).toUpperCase();

        const bookingData = {
            code: uniqueCode,
            villa: villa.title,
            customer: firstName,
            email: email,
            total: formatter.format(total),
            status: 'Confirmed'
        };

        let allBookings = JSON.parse(localStorage.getItem('abbaBookings')) || [];
        allBookings.push(bookingData);
        localStorage.setItem('abbaBookings', JSON.stringify(allBookings));

        document.getElementById('booking-container').classList.add('d-none');
        document.getElementById('booking-success').classList.remove('d-none');
        document.getElementById('success-code').textContent = uniqueCode;
        window.scrollTo(0,0);
    }

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

        let html = '';
        dataVillas.forEach(villa => {
            const badgeHtml = showBadge ? 
                `<span class="badge bg-dark position-absolute top-0 start-0 m-3">${villa.category}</span>` : '';
            
            html += `
            <div class="col-md-4">
                <div class="card h-100 border-0 shadow-sm package-card" style="cursor:pointer;" onclick="navigateTo('detail', '${villa.id}')">
                    <div style="height: 250px; overflow:hidden; position:relative;">
                        <img src="${villa.image}" class="w-100 h-100" style="object-fit:cover;">
                        ${badgeHtml}
                    </div>
                    <div class="card-body text-center">
                        <h5 class="serif-text mt-2">${villa.title}</h5>
                        <p class="small text-muted mb-2">${villa.duration}</p>
                        <h6 style="color:#CCA075;">${villa.price}</h6>
                        <button class="btn btn-sm btn-outline-dark mt-3 w-100">LIHAT DETAIL</button>
                    </div>
                </div>
            </div>`;
        });
        container.innerHTML = html;
    }

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

    function updateElement(id, property, value) {
        const el = document.getElementById(id);
        if (el) {
            if (property === 'style.backgroundImage') el.style.backgroundImage = value;
            else el[property] = value;
        }
    }

    document.addEventListener('router:loaded', function(e) {
        const { page, data } = e.detail;

        navbar.classList.remove('menu-open');
        if(toggler) toggler.classList.remove('open');

        setTimeout(() => {
            const isHome = (page === 'home');
            if (isHome && window.scrollY < 50) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled');
            }
        }, 50);

        switch (page) {
            case 'villas': renderAllVillas(); break;
            case 'category': renderCategoryPage(data); break;
            case 'detail': renderDetail(data); break;
            case 'book': renderBooking(data); break;
            case 'check-booking': initCheckBooking(); break;
        }
    });

    if (window.navigateTo) {
        const hash = window.location.hash.substring(1); 

        if (hash) {
            let savedData = sessionStorage.getItem('params_' + hash);
            if (savedData) {
                try {
                    savedData = JSON.parse(savedData);
                } catch(e) { savedData = null; }
            }
            window.navigateTo(hash, savedData);
        } else {
            window.navigateTo('home');
        }
    }
});