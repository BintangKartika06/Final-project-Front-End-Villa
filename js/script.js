document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    const toggler = document.querySelector('.navbar-toggler');
    const mainContent = document.getElementById('app-content');


    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (toggler) {
        toggler.addEventListener('click', function() {
            this.classList.toggle('open');
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.toggle('menu-open');
            }
        });
    }


    function initPackageSlideshow() {
        const packageImg = document.querySelector('.package-img-wrapper');
        if (!packageImg) return;

        const slides = [
            'Media/slide1.jpg',
            'Media/slide2.jpg',
            'Media/slide3.jpg',
            'Media/slide4.png'
        ];
        
        let currentIndex = 0;

        packageImg.style.transition = "background-image 1.5s ease-in-out";

        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            packageImg.style.backgroundImage = `url('${slides[currentIndex]}')`;
        }, 6000); // Interval 6 detik
    }

    initPackageSlideshow();

    window.navigateTo = function(pageName) {
        if (pageName === 'home') {
            location.reload(); 
            return;
        }

        const collapse = document.querySelector('.navbar-collapse');
        if (collapse && collapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapse);
            if (bsCollapse) bsCollapse.hide();
            if (toggler.classList.contains('open')) toggler.classList.remove('open');
        }

        if (mainContent) {
            mainContent.classList.add('fade-out');
            setTimeout(() => {
                mainContent.innerHTML = `
                    <section class="container py-5 mt-5 text-center">
                        <div class="py-5">
                            <h2 class="serif-text display-4 mb-4">Halaman ${pageName.toUpperCase()}</h2>
                            <p class="lead">Konten sedang dalam pengembangan.</p>
                            <button class="btn btn-book-now px-4 py-2 mt-3" onclick="navigateTo('home')">KEMBALI</button>
                        </div>
                    </section>
                `;
                mainContent.classList.remove('fade-out');
                window.scrollTo(0, 0);
                navbar.classList.add('scrolled');
            }, 300);
        }
    };
});