document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    let cachedVillas = null;


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

    if (toggler) {
        toggler.addEventListener('click', function() {
            this.classList.toggle('open');
            const isMenuOpen = this.classList.contains('open');
            
            if (isMenuOpen) {
                navbar.classList.add('menu-open'); 
            } else {
                if (window.scrollY < 50) {
                    navbar.classList.remove('menu-open');
                    navbar.classList.remove('scrolled');
                }
            }
        });
    }

    document.addEventListener('router:loaded', function(e) {
        const { page, data } = e.detail;

        navbar.classList.remove('menu-open');
        if(toggler) toggler.classList.remove('open');
        const collapse = document.querySelector('.navbar-collapse');
        if(collapse) collapse.classList.remove('show');

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

    async function getVillas() {
        if (cachedVillas) return cachedVillas;
        try {
            const res = await fetch('data/villas.json');
            cachedVillas = await res.json();
            return cachedVillas;
        } catch (err) {
            console.error("Gagal memuat data villa:", err);
            return [];
        }
    }
    
    async function renderCategoryPage(categoryName) {
        const container = document.getElementById('category-list-container');
        if (!container) return;
        
        updateElement('category-title', 'innerText', `${categoryName} Collection`);
        updateElement('category-desc', 'innerText', `Menampilkan pilihan villa terbaik di kategori ${categoryName}`);
        
        const villas = await getVillas();
        const filteredVillas = villas.filter(v => v.category === categoryName);
        
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

    async function renderDetail(villaId) {
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
    
    function updateElement(id, property, value) {
        const el = document.getElementById(id);
        if (el) {
            if (property === 'style.backgroundImage') el.style.backgroundImage = value;
            else el[property] = value;
        }
    }


    if (window.navigateTo) window.navigateTo('home');

});