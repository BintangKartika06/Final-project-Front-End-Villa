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

    if (!fileUrl) {
        if (pageName === 'rooms') pageName = 'villas'; 
        else return;
    }

    if (paramData !== null && paramData !== undefined) {
        sessionStorage.setItem('params_' + pageName, JSON.stringify(paramData));
    }

    if (pageName === 'home') {
        history.replaceState(null, null, ' '); 
    } else {
        window.location.hash = pageName;
    }

    const collapse = document.querySelector('.navbar-collapse');
    if (collapse) collapse.classList.remove('show');
    document.querySelector('.navbar-toggler')?.classList.remove('open');

    if(mainContent) mainContent.classList.add('fade-out');

    try {
        const response = await fetch(routes[pageName] || routes['villas']); 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const html = await response.text();

        setTimeout(() => {
            if(mainContent) {
                mainContent.innerHTML = html;
                mainContent.classList.remove('fade-out');
            }
            
            window.scrollTo(0, 0);

            document.dispatchEvent(new CustomEvent('router:loaded', { 
                detail: { page: pageName, data: paramData } 
            }));

        }, 300);

    } catch (error) {
        console.error(error);
        if(mainContent) mainContent.innerHTML = "<div class='text-center py-5'><h3>Halaman Sedang Perbaikan</h3></div>";
    }
};

window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        let savedData = sessionStorage.getItem('params_' + hash);
        if (savedData) savedData = JSON.parse(savedData);
        
        navigateTo(hash, savedData);
    } else {
        navigateTo('home');
    }
});

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';