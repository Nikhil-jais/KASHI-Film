"use strict";

/* =========================================
   VARANASI — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ===================================== */

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
            document.body.classList.remove("loading");
        }, 1200);
    }


    /* =====================================
       MOBILE MENU
    ===================================== */

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });
    }


    /* =====================================
       FLOATING PARTICLES
    ===================================== */

    const particleContainer =
        document.getElementById("heroParticles");

    if (particleContainer) {

        for (let i = 0; i < 35; i++) {

            const particle =
                document.createElement("span");

            particle.className = "particle";

            particle.style.left =
                Math.random() * 100 + "%";

            particle.style.animationDuration =
                (8 + Math.random() * 15) + "s";

            particle.style.animationDelay =
                Math.random() * 10 + "s";

            const size =
                1 + Math.random() * 3;

            particle.style.width = size + "px";
            particle.style.height = size + "px";

            particleContainer.appendChild(particle);
        }
    }


    /* =====================================
       PARALLAX ELEMENTS
    ===================================== */

    const heroImage =
        document.querySelector(".hero-image");

    const gangaBackground =
        document.querySelector(".ganga-background");

    const streetBackground =
        document.querySelector(".street-background");

    const sarnathBackground =
        document.querySelector(".sarnath-background");


    function updateParallax() {

        const scrollY = window.scrollY;

        if (heroImage) {

            heroImage.style.transform =
                "translateY(" +
                scrollY * 0.18 +
                "px) scale(1.08)";
        }


        if (gangaBackground) {

            const section =
                gangaBackground.parentElement;

            const rect =
                section.getBoundingClientRect();

            const offset =
                (window.innerHeight / 2 - rect.top) * 0.08;

            gangaBackground.style.transform =
                "translateY(" +
                offset +
                "px) scale(1.08)";
        }


        if (streetBackground) {

            const section =
                streetBackground.parentElement;

            const rect =
                section.getBoundingClientRect();

            const offset =
                (window.innerHeight / 2 - rect.top) * 0.08;

            streetBackground.style.transform =
                "translateY(" +
                offset +
                "px) scale(1.08)";
        }


        if (sarnathBackground) {

            const section =
                sarnathBackground.parentElement;

            const rect =
                section.getBoundingClientRect();

            const offset =
                (window.innerHeight / 2 - rect.top) * 0.08;

            sarnathBackground.style.transform =
                "translateY(" +
                offset +
                "px) scale(1.08)";
        }
    }


    let ticking = false;

    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                updateParallax();

                ticking = false;

            });

            ticking = true;
        }
    });


    /* =====================================
       HERO MOUSE MOVEMENT
    ===================================== */

    const heroContent =
        document.querySelector(".hero-content");

    if (heroContent && window.innerWidth > 800) {

        window.addEventListener("mousemove", event => {

            const x =
                (event.clientX / window.innerWidth - 0.5) * 10;

            const y =
                (event.clientY / window.innerHeight - 0.5) * 10;

            heroContent.style.transform =
                "translate(" +
                x +
                "px, " +
                y +
                "px)";
        });
    }


    /* =====================================
       GHAT CARD 3D EFFECT
    ===================================== */

    const cards =
        document.querySelectorAll(".ghat-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 800) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                "perspective(1000px) " +
                "rotateX(" +
                rotateX +
                "deg) rotateY(" +
                rotateY +
                "deg)";
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) " +
                "rotateX(0deg) " +
                "rotateY(0deg)";
        });
    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".intro-content, " +
            ".section-heading, " +
            ".ganga-content, " +
            ".temple-feature, " +
            ".street-content, " +
            ".culture-item, " +
            ".sarnath-content, " +
            ".final-content"
        );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );
                        }
                    });
                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    if ("IntersectionObserver" in window) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            navLinks.forEach(link => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute("href") ===
                                    "#" + entry.target.id
                                ) {

                                    link.classList.add(
                                        "active"
                                    );
                                }
                            });
                        }
                    });
                },
                {
                    threshold: 0.45
                }
            );


        sections.forEach(section => {
            navObserver.observe(section);
        });
    }


    /* =====================================
       INITIAL PARALLAX
    ===================================== */

    updateParallax();


    /* =====================================
       DEBUG MESSAGE
    ===================================== */

    console.log(
        "VARANASI — The Eternal City loaded successfully."
    );

});
