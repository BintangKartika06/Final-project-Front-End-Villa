// Konfigurasi: Mapping antara nama halaman (hash) dan file HTML fisiknya
const routes = {
    'home': 'pages/home.html',
    'category': 'pages/category.html',
    'detail': 'pages/detail.html',
    'about': 'pages/about.html',
    'villas': 'pages/villas.html',
    'discover': 'pages/discover.html',
    'facility': 'pages/facility.html',
    'book': 'pages/booking.html',
    'contact': 'pages/contact.html',
    'gallery': 'pages/gallery.html',
    'check-booking': 'pages/check-booking.html',
    'reviews': 'pages/reviews.html'
};

window.navigateTo = async function(pageName, paramData = null) {
    const mainContent = document.getElementById('app-content');

    // State Management: Simpan parameter data ke SessionStorage sementara
    if (paramData !== null && paramData !== undefined) {
        sessionStorage.setItem('params_' + pageName, JSON.stringify(paramData));
    }

    // Update URL Browser (History API)
    if (pageName === 'home') {
        history.replaceState(null, null, ' '); 
    } else {
        window.location.hash = pageName;
    }

    // Animasi Transisi Keluar
    if(mainContent) mainContent.classList.add('fade-out');

    try {
        // Fetch Content HTML
        const response = await fetch(routes[pageName]); 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const html = await response.text();

        setTimeout(() => {
            if(mainContent) {
                mainContent.innerHTML = html;
                mainContent.classList.remove('fade-out');
            }
            
            window.scrollTo(0, 0);

            // Memberitahu script.js bahwa halaman baru telah dimuat
            document.dispatchEvent(new CustomEvent('router:loaded', { 
                detail: { page: pageName, data: paramData } 
            }));

        }, 300); // Delay sesuai durasi CSS transition

    } catch (error) {
        console.error("Router Error:", error);
        if(mainContent) mainContent.innerHTML = "<div class='text-center py-5'><h3>Halaman Sedang Perbaikan</h3></div>";
    }
};

// Menangani tombol Back/Forward browser
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        // Restore data parameter jika ada
        let savedData = sessionStorage.getItem('params_' + hash);
        try { savedData = JSON.parse(savedData); } catch(e) {}
        navigateTo(hash, savedData);
    } else {
        navigateTo('home');
    }
});

// Mencegah browser scroll otomatis saat refresh (agar transisi mulus)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';