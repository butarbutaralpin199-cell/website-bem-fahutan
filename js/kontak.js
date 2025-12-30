document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. ANIMASI KARTU KONTAK ---
    const cards = document.querySelectorAll('.contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.5s ease-out";
        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 150 * (index + 1));
    });

    // --- 2. LOGIKA DROPDOWN (TENTANG KAMI & INFO) ---
    // Menggunakan satu fungsi untuk menangani semua klik di navbar
    const navbar = document.querySelector('.navbar');

    navbar.addEventListener('click', function(e) {
        const toggle = e.target.closest('.dropdown-toggle');
        
        // Jika yang diklik bukan tombol dropdown, abaikan
        if (!toggle) return;

        e.preventDefault();
        e.stopPropagation();

        const parent = toggle.closest('.dropdown');
        const isActive = parent.classList.contains('active');

        // Tutup semua dropdown yang sedang terbuka
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });

        // Jika tadi belum aktif, sekarang aktifkan
        if (!isActive) {
            parent.classList.add('active');
        }
    });

    // Klik di mana saja untuk menutup dropdown
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown').forEach(d => {
            d.classList.remove('active');
        });
    });
});



// ANIMASI 
document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.contact-card');

    // Animasi Masuk ala Framer Motion (React Bits)
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px) scale(0.9)";
        
        setTimeout(() => {
            card.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
        }, 100 * (index + 1));
    });

    // Efek Tilt (Miring) saat mouse mendekat (Opsional)
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
        });
    });

    // Logika Dropdown (Tetap dipertahankan dari versi sebelumnya)
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const isActive = dropdown.classList.contains('active');
            dropdowns.forEach(d => d.classList.remove('active'));
            if (!isActive) dropdown.classList.add('active');
        });
    });

    window.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('active'));
    });
});