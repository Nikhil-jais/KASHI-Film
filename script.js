"use strict";


/* =========================================================
   START
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("loader");

    const loaderSymbol =
        document.querySelector(".loader-symbol");

    const loaderLine =
        document.querySelector(".loader-line span");


    if (typeof gsap !== "undefined") {

        gsap.to(loaderSymbol, {
            opacity: 1,
            scale: 1,
            duration: 4.5,
            ease: "power3.out"
        });

        gsap.to(loaderLine, {
            width: "100%",
            duration: 4.5,
            ease: "power2.inOut"
        });

        setTimeout(() => {

            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                pointerEvents: "none",
                onComplete: () => {
                    loader.style.display = "none";
                    startAnimations();
                }
            });

        }, 1800);

    } else {

        loader.style.display = "none";
        startAnimations();

    }

});


/* =========================================================
   GSAP
========================================================= */

function startAnimations() {

    if (typeof gsap === "undefined") {
        return;
    }

    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }


    /* =====================================================
       HERO INTRO
    ===================================================== */

    const heroTimeline = gsap.timeline();

    heroTimeline
        .from(".hero-kicker", {
            opacity: 0,
            y: 25,
            duration: 1
        })
        .from(".hero-title span", {
            yPercent: 110,
            rotateX: 70,
            duration: 4.5,
            ease: "power4.out"
        }, "-=.6")
        .from(".hero-subtitle", {
            opacity: 0,
            letterSpacing: "25px",
            duration: 4
        }, "-=.7")
        .from(".hero-intro", {
            opacity: 0,
            y: 25,
            duration: 4
        }, "-=.6")
        .from(".enter-button", {
            opacity: 0,
            scale: .85,
            duration: 4
        }, "-=.5")
        .from(".hero-bottom", {
            opacity: 0,
            y: 20,
            duration: 3
        }, "-=.6");


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    if (typeof ScrollTrigger !== "undefined") {

        gsap.to(".hero-image", {
            yPercent: 18,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });


        gsap.to(".hero-content", {
            yPercent: -35,
            opacity: .2,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });


        gsap.to(".hero-side", {
            y: -150,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });


        /* =================================================
           HERO SCROLL LINE
        ================================================= */

        gsap.to(".scroll-line span", {
            x: "100%",
            duration: 4.5,
            repeat: -1,
            ease: "none"
        });


        /* =================================================
           REVEALS
        ================================================= */

        gsap.utils.toArray(".reveal").forEach(element => {

            gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 4.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 82%",
                    toggleActions:
                        "play none none reverse"
                }
            });

        });


        /* =================================================
           GANGA
        ================================================= */

        gsap.to(".ganga-image", {
            yPercent: 14,
            scale: 2.78,
            ease: "none",
            scrollTrigger: {
                trigger: ".ganga",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });


        gsap.from(".giant-title", {
            xPercent: -25,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".ganga",
                start: "top 70%",
                end: "center center",
                scrub: 1
            }
        });


        /* =================================================
           QUOTE
        ================================================= */

        gsap.from(".quote", {
            y: 120,
            opacity: 0,
            scrollTrigger: {
                trigger: ".quote-section",
                start: "top 75%",
                end: "center center",
                scrub: 1
            }
        });


        /* =================================================
           GHAT CARDS
        ================================================= */

        gsap.utils.toArray(".ghat-card").forEach((card, index) => {

            gsap.from(card, {
                y: 100 + index * 50,
                opacity: 0,
                rotate: index === 1 ? 1 : -1,
                duration: 4.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions:
                        "play none none reverse"
                }
            });


            const image =
                card.querySelector(".ghat-image");


            gsap.to(image, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

        });


        /* =================================================
           GALIS
        ================================================= */

        gsap.to(".gali-image", {
            scale: 1.18,
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: ".galis",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });


        gsap.from(".gali-title", {
            xPercent: -20,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".galis",
                start: "top 75%",
                end: "center center",
                scrub: 1
            }
        });


        /* =================================================
           TEMPLE IMAGE
        ================================================= */

        gsap.to(".temple-image", {
            scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: ".temple-image-wrap",
                start: "top bottom",
                end: "center center",
                scrub: 1
            }
        });


        gsap.from(".temple-copy", {
            x: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: ".temple-feature",
                start: "top 75%",
                end: "center center",
                scrub: 1
            }
        });


        gsap.to(".temple-image-shine", {
            x: "200%",
            ease: "none",
            scrollTrigger: {
                trigger: ".temple-image-wrap",
                start: "top 70%",
                end: "bottom 40%",
                scrub: 1
            }
        });


        /* =================================================
           CULTURE
        ================================================= */

        gsap.to(".culture-background", {
            scale: 1.18,
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
                trigger: ".culture",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });


        gsap.from(".culture-title", {
            y: 120,
            opacity: 0,
            scrollTrigger: {
                trigger: ".culture",
                start: "top 70%",
                end: "center center",
                scrub: 1
            }
        });


        gsap.from(".culture-grid div", {
            y: 50,
            opacity: 0,
            stagger: .15,
            scrollTrigger: {
                trigger: ".culture-grid",
                start: "top 80%",
                toggleActions:
                    "play none none reverse"
            }
        });


        /* =================================================
           SARNATH
        ================================================= */

        gsap.to(".sarnath-image", {
            scale: 1.16,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: ".sarnath",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            }
        });


        gsap.from(".sarnath-content h2", {
            xPercent: -30,
            opacity: 0,
            scrollTrigger: {
                trigger: ".sarnath",
                start: "top 75%",
                end: "center center",
                scrub: 1
            }
        });


        /* =================================================
           FINALE
        ================================================= */

        gsap.to(".finale-bg", {
            scale: 1.15,
            yPercent: -5,
            ease: "none",
            scrollTrigger: {
                trigger: ".finale",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });


        gsap.from(".finale-content", {
            y: 100,
            opacity: 0,
            scrollTrigger: {
                trigger: ".finale",
                start: "top 70%",
                end: "center center",
                scrub: 1
            }
        });


        /* =================================================
           SCROLL PROGRESS
        ================================================= */

        gsap.to(".scroll-progress span", {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                start: "top top",
                end: "max",
                scrub: true
            }
        });

    }


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");


    if (cursorDot && cursorRing) {

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        let ringX = mouseX;
        let ringY = mouseY;


        window.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

        });


        function animateCursor() {

            ringX += (mouseX - ringX) * .12;
            ringY += (mouseY - ringY) * .12;

            cursorRing.style.left = ringX + "px";
            cursorRing.style.top = ringY + "px";

            requestAnimationFrame(animateCursor);

        }

        animateCursor();


        document
            .querySelectorAll("a, button, .ghat-card")
            .forEach(element => {

                element.addEventListener("mouseenter", () => {
                    cursorRing.classList.add("active");
                });

                element.addEventListener("mouseleave", () => {
                    cursorRing.classList.remove("active");
                });

            });

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".magnetic")
        .forEach(button => {

            button.addEventListener("mousemove", event => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                gsap.to(button, {
                    x: x * .18,
                    y: y * .18,
                    duration: .4,
                    ease: "power3.out"
                });

            });


            button.addEventListener("mouseleave", () => {

                gsap.to(button, {
                    x: 0,
                    y: 0,
                    duration: .6,
                    ease: "elastic.out(1,.4)"
                });

            });

        });


    /* =====================================================
       MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const menuOverlay =
        document.getElementById("menuOverlay");


    if (menuButton && menuOverlay) {

        menuButton.addEventListener("click", () => {

            menuOverlay.classList.toggle("open");

        });


        menuOverlay
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {
                    menuOverlay.classList.remove("open");
                });

            });

    }


    /* =====================================================
       3D CARD MOVEMENT
    ===================================================== */

    document
        .querySelectorAll(".ghat-card")
        .forEach(card => {

            card.addEventListener("mousemove", event => {

                if (window.innerWidth < 800) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 4;

                const rotateX =
                    ((y / rect.height) - .5) * -4;


                gsap.to(card, {
                    rotateX,
                    rotateY,
                    transformPerspective: 900,
                    duration: .5,
                    ease: "power2.out"
                });

            });


            card.addEventListener("mouseleave", () => {

                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: .7,
                    ease: "power3.out"
                });

            });

        });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }

    });

}
