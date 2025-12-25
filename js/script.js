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

    if (window.navigateTo) window.navigateTo('home');

});