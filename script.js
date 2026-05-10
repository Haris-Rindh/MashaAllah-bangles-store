// ─── PROMO BANNER ───────────────────────────────────────────────
const promoMessages = [
  "Free delivery on orders over PKR 2,000 · Shop Now",
  "New Bridal Collection 2025 — Exclusively Online",
  "Handcrafted Luxury Bangles — Order Before 6pm for Same Day Dispatch",
  "Exclusive Member Discounts — Join Our Community Today",
];
let promoIdx = 0;
const promoText = document.getElementById("promo-text");
function cyclePromo() {
  promoText.style.opacity = "0";
  setTimeout(() => {
    promoIdx = (promoIdx + 1) % promoMessages.length;
    promoText.textContent = promoMessages[promoIdx];
    promoText.style.opacity = "1";
  }, 500);
}
promoText.textContent = promoMessages[0];
promoText.style.opacity = "1";
promoText.style.transition = "opacity 0.5s ease";
setInterval(cyclePromo, 4000);

// ─── SIDE DRAWER ─────────────────────────────────────────────────
const menuBtn = document.getElementById("menu-btn");
const closeDrawer = document.getElementById("close-drawer");
const drawer = document.getElementById("side-drawer");
const overlay = document.getElementById("drawer-overlay");

function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeDrawerFn() {
  drawer.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}
menuBtn.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerFn);
overlay.addEventListener("click", closeDrawerFn);

// Accordion sub-menus
document.querySelectorAll(".drawer-item").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    const sub = document.getElementById("sub-" + cat);
    const isOpen = sub.classList.contains("open");
    // Close all
    document.querySelectorAll(".sub-menu").forEach((s) => s.classList.remove("open"));
    document.querySelectorAll(".drawer-item").forEach((b) => b.classList.remove("open"));
    if (!isOpen) {
      sub.classList.add("open");
      btn.classList.add("open");
    }
  });
});

// ─── HERO CAROUSEL ───────────────────────────────────────────────
const slides = document.querySelectorAll(".hero-slide");
const dotsContainer = document.getElementById("hero-dots");
let currentSlide = 0;
let heroTimer;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.classList.add("hero-dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(idx) {
  slides[currentSlide].classList.remove("active");
  document.querySelectorAll(".hero-dot")[currentSlide].classList.remove("active");
  currentSlide = (idx + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  document.querySelectorAll(".hero-dot")[currentSlide].classList.add("active");
  resetTimer();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function resetTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextSlide, 5000);
}

document.getElementById("hero-next").addEventListener("click", nextSlide);
document.getElementById("hero-prev").addEventListener("click", prevSlide);

// Touch swipe support
let touchStartX = 0;
const carousel = document.getElementById("hero-carousel");
carousel.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
carousel.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { diff > 0 ? nextSlide() : prevSlide(); }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

heroTimer = setInterval(nextSlide, 5000);

// ─── SCROLL REVEAL ───────────────────────────────────────────────
const revealEls = document.querySelectorAll(
  ".cat-card, .product-card, .featured-text, .join-title, .join-sub, .join-form"
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  revealObserver.observe(el);
});

// ─── ADD TO BAG FEEDBACK ─────────────────────────────────────────
document.querySelectorAll(".btn-add-bag").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const original = btn.textContent;
    btn.textContent = "✓ Added!";
    btn.style.background = "var(--color-pink-dark)";
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = "";
    }, 1800);
  });
});

// ─── WISHLIST TOGGLE ─────────────────────────────────────────────
document.querySelectorAll(".wishlist-btn").forEach((btn) => {
  let wished = false;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    wished = !wished;
    btn.textContent = wished ? "♥" : "♡";
    btn.style.color = wished ? "var(--color-pink-medium)" : "var(--color-pink-dark)";
  });
});

// ─── SMOOTH SECTION HIGHLIGHTING ─────────────────────────────────
// Stagger animation for category grid cards
const catCards = document.querySelectorAll(".cat-card");
catCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.07}s`;
});

const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.06}s`;
});
