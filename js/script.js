
// =====================================
// MDC - MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


// =====================================
// MDC - SCROLL REVEAL ANIMATIONS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // Respect the visitor's reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Elements that appear smoothly while scrolling
    const revealElements = document.querySelectorAll(`
        section:not(.hero) .section-heading,
        .about-text,
        .about-card,
        .skill-card,
        .project-card,
        .experience-card,
        .beyond-card,
        .beyond-quote,
        .contact-info,
        .site-footer
    `);

   
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
}, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach((element, index) => {
    element.classList.add("reveal");

    element.style.transitionDelay = `${(index % 4) * 100}ms`;

    revealObserver.observe(element);
});

});

/* =====================================
   MDC - QUANTUM & SPACE ANIMATION
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const canvas = document.createElement("canvas");
    canvas.id = "mdc-cosmic-canvas";
    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width, height;
    let stars = [];
    let particles = [];
    let animationId;

    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        stars = Array.from({ length: Math.min(130, Math.floor(width / 10)) }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.4 + 0.3,
            alpha: Math.random() * 0.65 + 0.15,
            speed: Math.random() * 0.012 + 0.003
        }));

        particles = Array.from({ length: 38 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() * 2 + 1
        }));
    }

    // Draw subtle engineering circuit paths
    function drawCircuits() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(75, 180, 255, 0.13)";

        const spacing = 100;

        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {

                if (Math.random() > 0.12) continue;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + 25, y);
                ctx.lineTo(x + 25, y + 25);
                ctx.lineTo(x + 55, y + 25);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(x + 55, y + 25, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(103, 232, 249, 0.45)";
                ctx.fill();
            }
        }
    }

    // Draw twinkling stars
    function drawStars(time) {
        stars.forEach(star => {
            const glow = star.alpha +
                Math.sin(time * star.speed) * 0.2;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

            ctx.fillStyle = `rgba(190, 215, 255, ${Math.max(0.1, glow)})`;
            ctx.fill();
        });
    }

// =====================================
// QUANTUM ORBITAL SYSTEM
// =====================================

let quantumTime = 0;

function drawParticles() {

    quantumTime += 0.012;

    const cx = width * 0.5;
    const cy = height * 0.5;

    // Responsive orbital size
    const scale = Math.min(width, height) * 0.19;

    // Central glowing nucleus
    const nucleusGlow = ctx.createRadialGradient(
        cx, cy, 1,
        cx, cy, scale * 0.32
    );

    nucleusGlow.addColorStop(0, "rgba(255,255,255,1)");
    nucleusGlow.addColorStop(0.18, "rgba(103,232,249,0.9)");
    nucleusGlow.addColorStop(0.5, "rgba(139,92,246,0.35)");
    nucleusGlow.addColorStop(1, "rgba(139,92,246,0)");

    ctx.beginPath();
    ctx.arc(cx, cy, scale * 0.32, 0, Math.PI * 2);
    ctx.fillStyle = nucleusGlow;
    ctx.fill();

    // Bright nucleus core
    ctx.beginPath();
    ctx.arc(cx, cy, scale * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = "#e0faff";
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#67e8f9";
    ctx.fill();
    ctx.shadowBlur = 0;

    // Three orbital planes
    const orbits = [
        { angle: 0, tilt: 0.30, speed: 1.0, color: "#67e8f9" },
        { angle: 1.05, tilt: 0.30, speed: -0.8, color: "#a78bfa" },
        { angle: 2.10, tilt: 0.30, speed: 0.65, color: "#38bdf8" }
    ];

    orbits.forEach((orbit, index) => {

        const rotation = orbit.angle;
        const rx = scale * 1.55;
        const ry = scale * 0.55;

        // Draw tilted elliptical orbit
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);

        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color + "65";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();

        // Electron travelling around the orbit
        const angle = quantumTime * orbit.speed + index * 2.1;

        const localX = rx * Math.cos(angle);
        const localY = ry * Math.sin(angle);

        const electronX =
            cx + localX * Math.cos(rotation) -
            localY * Math.sin(rotation);

        const electronY =
            cy + localX * Math.sin(rotation) +
            localY * Math.cos(rotation);

        // Electron glow
        ctx.beginPath();
        ctx.arc(electronX, electronY, 5, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color;
        ctx.shadowBlur = 22;
        ctx.shadowColor = orbit.color;
        ctx.fill();
        ctx.shadowBlur = 0;

    });
}

    function animate(time) {
        ctx.clearRect(0, 0, width, height);

        drawCircuits();
        drawStars(time);
        drawParticles();

        animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    animate(0);

});
