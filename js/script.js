const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const dropdown = document.getElementById("dropdownTentang");
const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

// Toggle menu mobile
menuToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

// Toggle dropdown
dropdownToggle.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  dropdown.classList.toggle("active");
});

// Klik di luar dropdown → tutup
document.addEventListener("click", function () {
  dropdown.classList.remove("active");
});
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-logo");
  if (!intro) return;

  const introImg = intro.querySelector("img");
  const navbarLogo = document.getElementById("navbarLogo");

  // pastikan logo navbar masih tersembunyi
  navbarLogo.style.opacity = "0";

  const navRect = navbarLogo.getBoundingClientRect();
  const introRect = introImg.getBoundingClientRect();

  const moveX =
    navRect.left +
    navRect.width / 2 -
    (introRect.left + introRect.width / 2);

  const moveY =
    navRect.top +
    navRect.height / 2 -
    (introRect.top + introRect.height / 2);

  // Jalankan animasi intro
  setTimeout(() => {
    introImg.style.transform = `
      translate(${moveX}px, ${moveY}px)
      scale(${navRect.width / introRect.width})
    `;
    introImg.style.opacity = "0";
  }, 400);

  // Setelah intro selesai → tampilkan logo navbar
  setTimeout(() => {
    navbarLogo.style.opacity = "1"; // 🔥 MUNCUL
  }, 1900);

  // Hapus elemen intro
  setTimeout(() => {
    intro.remove();
  }, 2400);
});
const calendarMonth = document.getElementById("calendarMonth");
const calendarDates = document.getElementById("calendarDates");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();

/* EVENT BEM (BISA KAMU TAMBAH) */
const bemEvents = {
  "2025-01-15": "Rapat Besar BEM",
  "2025-01-22": "Pelatihan Kepemimpinan",
  "2025-02-05": "Aksi Sosial Kehutanan"
};

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  calendarMonth.innerText = currentDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric"
  });

  calendarDates.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // kosong sebelum tanggal 1
  for (let i = 0; i < firstDay; i++) {
    calendarDates.innerHTML += `<div></div>`;
  }

  // isi tanggal
  for (let day = 1; day <= lastDate; day++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    const hasEvent = bemEvents[fullDate];

    calendarDates.innerHTML += `
      <div class="calendar-date ${isToday ? "today" : ""} ${hasEvent ? "event" : ""}" 
           title="${hasEvent || ""}">
        <span>${day}</span>
      </div>
    `;
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("newsSlider");
  const track = document.getElementById("newsTrack");
  const prevBtn = document.getElementById("newsPrev");
  const nextBtn = document.getElementById("newsNext");
  const dotsWrap = document.getElementById("newsDots");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!slider || !track) return;

  let items = Array.from(track.children);
  let index = 0;
  let startX = 0;
  let isDragging = false;
  let itemWidth = items[0].offsetWidth + 28;

  /* ================= CLONE UNTUK INFINITE ================= */
  items.forEach(item => {
    track.appendChild(item.cloneNode(true));
  });

  function updateSlide(animate = true) {
    track.style.transition = animate ? "transform .6s cubic-bezier(.4,0,.2,1)" : "none";
    track.style.transform = `translateX(-${index * itemWidth}px)`;
    updateDots();
  }

  /* ================= BUTTON ================= */
  nextBtn?.addEventListener("click", () => {
    index++;
    updateSlide();
  });

  prevBtn?.addEventListener("click", () => {
    index--;
    updateSlide();
  });

  /* ================= INFINITE RESET ================= */
  track.addEventListener("transitionend", () => {
    if (index >= items.length) {
      index = 0;
      updateSlide(false);
    }
    if (index < 0) {
      index = items.length - 1;
      updateSlide(false);
    }
  });

  /* ================= DOT ================= */
  function createDots() {
    dotsWrap.innerHTML = "";
    items.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        index = i;
        updateSlide();
      });
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll("span");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index % items.length);
    });
  }

  createDots();

  /* ================= DRAG / SWIPE ================= */
  slider.addEventListener("mousedown", (e) => {
    startX = e.pageX;
    isDragging = true;
  });

  slider.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    const diff = e.pageX - startX;
    if (diff < -60) index++;
    if (diff > 60) index--;
    updateSlide();
    isDragging = false;
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -60) index++;
    if (diff > 60) index--;
    updateSlide();
  });

  /* ================= AUTO SLIDE ================= */
  let autoSlide = setInterval(() => {
    index++;
    updateSlide();
  }, 4500);

  slider.addEventListener("mouseenter", () => clearInterval(autoSlide));
  slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
      index++;
      updateSlide();
    }, 4500);
  });

  /* ================= FILTER ================= */
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      items.forEach(item => {
        item.style.display =
          filter === "all" || item.classList.contains(filter)
            ? "block"
            : "none";
      });

      index = 0;
      updateSlide(false);
    });
  });

  /* ================= RESPONSIVE UPDATE ================= */
  window.addEventListener("resize", () => {
    itemWidth = items[0].offsetWidth + 28;
    updateSlide(false);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".hotline-card");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    observer.observe(card);
  });
});

// Ganti bagian slider misi kamu dengan ini agar lebih smooth
const misiSlider = document.getElementById("misiSlider");

if (misiSlider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  misiSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    misiSlider.style.cursor = "grabbing";
    startX = e.pageX - misiSlider.offsetLeft;
    scrollLeft = misiSlider.scrollLeft;
  });

  misiSlider.addEventListener("mouseleave", () => {
    isDown = false;
    misiSlider.style.cursor = "grab";
  });

  misiSlider.addEventListener("mouseup", () => {
    isDown = false;
    misiSlider.style.cursor = "grab";
  });

  misiSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - misiSlider.offsetLeft;
    const walk = (x - startX) * 2; // Kecepatan scroll
    misiSlider.scrollLeft = scrollLeft - walk;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hotlineBg = document.getElementById("hotlineBg");
  const cards = document.querySelectorAll(".hotline-card");

  if (!hotlineBg || cards.length === 0) return;

  cards.forEach(card => {
    const img = card.querySelector("img");
    if (!img) return;

    const bgImage = img.getAttribute("src");

    card.addEventListener("mouseenter", () => {
      hotlineBg.style.backgroundImage = `url('${bgImage}')`;
      hotlineBg.style.opacity = "1";
      hotlineBg.style.transform = "scale(1)";
    });

    card.addEventListener("mouseleave", () => {
      hotlineBg.style.opacity = "0";
      hotlineBg.style.transform = "scale(1.08)";
    });
  });
});

// ===============================
// NAVBAR SCROLL BLUR EFFECT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  // Jalankan saat halaman pertama kali load
  handleScroll();

  // Event listener scroll
  window.addEventListener("scroll", handleScroll);
});

// SATU FUNGSI UNTUK SEMUA DROPDOWN
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if(toggle) {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = dropdown.classList.contains('active');
            
            // Tutup semua yang lain
            document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            
            // Buka yang diklik jika sebelumnya tidak aktif
            if (!isActive) dropdown.classList.add('active');
        });
    }
});

// Klik luar tutup semua
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
});

// ==========================================
// KHUSUS DROPDOWN INFORMASI MAHASISWA
// ==========================================
(function() {
  const infoMenu = document.getElementById("dropdownInfo");
  
  if (infoMenu) {
    const infoToggle = infoMenu.querySelector(".dropdown-toggle");

    infoToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Hanya toggle class active milik sendiri
      infoMenu.classList.toggle("active");
      
      // Opsional: Tutup menu 'Tentang Kami' jika sedang terbuka
      const tentangKami = document.getElementById("dropdownTentang");
      if (tentangKami) tentangKami.classList.remove("active");
    });

    // Klik di luar hanya menghapus class active dari menu ini
    document.addEventListener("click", function (e) {
      if (!infoMenu.contains(e.target)) {
        infoMenu.classList.remove("active");
      }
    });
  }
})();

// Otomatis deteksi halaman aktif
document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
});



document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. FUNGSI REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll(".reveal, .reveal-left");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                // Jika ingin animasi hanya sekali, aktifkan baris di bawah:
                // revealObserver.unobserve(entry.target);
            } else {
                // Hapus baris ini jika tidak ingin efek Fade Out saat scroll ke atas lagi
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.15 // Elemen akan muncul jika 15% bagian sudah terlihat
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- 2. LOGIKA NAVBAR DROPDOWN (Agar tetap sinkron) ---
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