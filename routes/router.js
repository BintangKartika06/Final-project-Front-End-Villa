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
    const fileUrl = routes[pageName];
    const mainContent = document.getElementById('app-content');

    if (!fileUrl) return;

    const collapse = document.querySelector('.navbar-collapse');
    if (collapse) collapse.classList.remove('show');
    document.querySelector('.navbar-toggler')?.classList.remove('open');

    if(mainContent) mainContent.classList.add('fade-out');

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const html = await response.text();

        setTimeout(() => {
            if(mainContent) {
                mainContent.innerHTML = html;
                mainContent.classList.remove('fade-out');
            }
            
            window.scrollTo(0, 0);

            if (!window.isPopState) {
                const url = pageName === 'home' ? '/' : `/${pageName}`;
                window.history.pushState({ page: pageName, data: paramData }, '', url);
            }
            window.isPopState = false;

            document.dispatchEvent(new CustomEvent('router:loaded', { 
                detail: { page: pageName, data: paramData } 
            }));

        }, 300); 

    } catch (error) {
        console.error("Router Error:", error);
        if(mainContent) mainContent.innerHTML = "<div class='text-center py-5'><h3>404 - Halaman Tidak Ditemukan</h3></div>";
    }
};

window.addEventListener('popstate', (e) => {
    window.isPopState = true;
    const state = e.state || {};
    navigateTo(state.page || 'home', state.data || null);
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';