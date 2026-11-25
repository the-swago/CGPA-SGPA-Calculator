// =========================================
// KTU Calculator - Homepage Script
// =========================================

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });
});

// =========================================
// Active Navbar Link
// =========================================

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});

// =========================================
// Fade Animation
// =========================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".feature,.info-card,.card").forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);

});

// =========================================
// Card Hover Effect
// =========================================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", x + "px");
        card.style.setProperty("--y", y + "px");

    });

});

// =========================================
// Floating Background Animation
// =========================================

let angle = 0;

setInterval(() => {

    angle += 0.1;

    document.querySelectorAll(".blob").forEach((blob, index) => {

        blob.style.transform =
            `translateY(${Math.sin(angle + index) * 20}px)
             translateX(${Math.cos(angle + index) * 20}px)`;

    });

}, 30);

// =========================================
// Welcome Animation
// =========================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});

// =========================================
// Console Message
// =========================================

console.log("%cKTU SGPA & CGPA Calculator",
    "color:#38bdf8;font-size:20px;font-weight:bold");

console.log("Developed using HTML, CSS and JavaScript");