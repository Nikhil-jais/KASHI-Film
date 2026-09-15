"use strict";

/* ================================
PAGE LOADER
================================ */

document.body.classList.add("loading");

window.addEventListener("load", () => {

```
setTimeout(() => {

    const loader = document.getElementById("loader");

    loader.classList.add("hidden");

    document.body.classList.remove("loading");

}, 1000);
```

});

/* ================================
MOBILE MENU
================================ */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {

```
menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("open");

});

mobileMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");

    });

});
```

}

/* ================================
FLOATING PARTICLES
================================ */

const particleContainer =
document.getElementById("heroParticles");

if (particleContainer) {

```
const particleCount = 35;

for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        8 + Math.random() * 15 + "s";

    particle.style.animationDelay =
        Math.random() * 10 + "s";

    const size =
        1 + Math.random() * 3;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particleContainer.appendChild(particle);

}
```

}

/* ================================
PARALLAX SCROLL
================================ */

const heroImage =
document.querySelector(".hero-image");

const gangaBackground =
document.querySelector(".ganga-background");

const streetBackground =
document.querySelector(".street-background");

const sarnathBackground =
document.querySelector(".sarnath-background");

function updateParallax() {

```
const scrollY = window.scrollY;

if (heroImage) {

    heroImage.style.transform =
        `translateY(${scrollY * 0.18}px) scale(1.08)`;

}

if (gangaBackground) {

    const rect =
        gangaBackground.parentElement.getBoundingClientRect();

    const offset =
        (window.innerHeight / 2 - rect.top) * 0.08;

    gangaBackground.style.transform =
        `translateY(${offset}px) scale(1.08)`;

}

if (streetBackground) {

    const rect =
        streetBackground.parentElement.getBoundingClientRect();

    const offset =
        (window.innerHeight / 2 - rect.top) * 0.08;

    streetBackground.style.transform =
        `translateY(${offset}px) scale(1.08)`;

}

if (sarnathBackground) {

    const rect =
        sarnathBackground.parentElement.getBoundingClientRect();

    const offset =
        (window.innerHeight / 2 - rect.top) * 0.08;

    sarnathBackground.style.transform =
        `translateY(${offset}px) scale(1.08)`;

}
```

}

let ticking = false;

window.addEventListener("scroll", () => {

```
if (!ticking) {

    window.requestAnimationFrame(() => {

        updateParallax();

        ticking = false;

    });

    ticking = true;

}
```

});

/* ================================
MOUSE MOVEMENT
================================ */

const heroContent =
document.querySelector(".hero-content");

if (heroContent && window.innerWidth > 800) {

```
window.addEventListener("mousemove", event => {

    const x =
        (event.clientX / window.innerWidth - .5) * 10;

    const y =
        (event.clientY / window.innerHeight - .5) * 10;

    heroContent.style.transform =
        `translate(${x}px, ${y}px)`;

});
```

}

/* ================================
CARD IMAGE TILT
================================ */

const cards =
document.querySelectorAll(".ghat-card");

cards.forEach(card => {

```
card.addEventListener("mousemove", event => {

    if (window.innerWidth <= 800) return;

    const rect =
        card.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;

    const rotateX =
        ((y / rect.height) - .5) * -4;

    const rotateY =
        ((x / rect.width) - .5) * 4;

    card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

card.addEventListener("mouseleave", () => {

    card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0)";

});
```

});

/* ================================
SECTION REVEAL
================================ */

const revealElements =
document.querySelectorAll(
".intro-content, .section-heading, .ganga-content, .temple-feature, .street-content, .culture-item, .sarnath-content, .final-content"
);

const revealObserver =
new IntersectionObserver(

```
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },

    {
        threshold: .15
    }

);
```

revealElements.forEach(element => {

```
element.classList.add("reveal");

revealObserver.observe(element);
```

});

/* ================================
ACTIVE NAVIGATION
================================ */

const sections =
document.querySelectorAll("section[id]");

const navLinks =
document.querySelectorAll(".nav-links a");

const navObserver =
new IntersectionObserver(

```
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        threshold: .45
    }

);
```

sections.forEach(section => {

```
navObserver.observe(section);
```

});

/* ================================
CONSOLE MESSAGE
================================ */

console.log(
"VARANASI — The Eternal City | Built with curiosity, culture and code."
);
