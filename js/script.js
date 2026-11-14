
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

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
