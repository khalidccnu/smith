// ===== Preloader =====
function preloader() {
    setTimeout(function() {
        document.getElementById("preloader").style.display = "none";
    }, 500);
}

// ===== Header / Navbar Toggle =====
let header = document.querySelector("header");

function navbar_toggle(collapseID) {
    let cID = document.getElementById(collapseID);
    let navbarTI = document.querySelector(".navbar-toggler-icon");
    let navbarBtn = document.getElementsByClassName("navbar-btn")[0];

    cID.classList.toggle("collapse");
    navbarBtn.classList.toggle("collapse");

    if (!cID.classList.contains("collapse")) {
        navbarTI.classList.replace("bx-menu", "bx-menu-alt-right");
        header.classList.add("navbar-shown");

        if (document.documentElement.scrollTop <= 10) header.classList.add("sticky");
    } else {
        navbarTI.classList.replace("bx-menu-alt-right", "bx-menu");
        header.classList.remove("navbar-shown");

        if (document.documentElement.scrollTop <= 10) header.classList.remove("sticky");
    }
}

// ===== Header / Navlink Active =====
let section = document.querySelectorAll("section");

function navlink_active() {
    let sY = scrollY;

    section.forEach(function(item) {
        let sectionTop = item.offsetTop - 250;
        let sectionBottom = sectionTop + item.offsetHeight;
        let sectionId = item.getAttribute("id");

        if (sY > sectionTop && sY <= sectionBottom) document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.add("active");
        else document.querySelector(".navbar-nav a[href*=" + sectionId + "]").classList.remove("active");
    });
}

// ===== Header / Fixed =====
let link = document.querySelectorAll("a[href*='#']:not([href='#'])");

link.forEach(function(item) {
    item.addEventListener("click", function(event) {
        if (innerWidth <= 768 && item.classList.contains("nav-link")) navbar_toggle("navbar-collapse");

        let href = item.getAttribute("href");
        let targetPos = document.querySelector(href).offsetTop;

        if (targetPos > scrollY) {
            scroll({
                behavior: "smooth",
                top: targetPos
            });
        } else {
            scroll({
                behavior: "smooth",
                top: targetPos - header.offsetHeight
            });
        }

        event.preventDefault();
    });
});

// ===== Header / Sticky =====
let oldSY = scrollY;

function header_sticky() {
    if (document.documentElement.scrollTop > 10) {
        header.classList.add("sticky");

        if (oldSY > scrollY) header.style.transform = "translateY(0)";
        else header.style.transform = "translateY(-" + header.offsetHeight + "px)";

        oldSY = scrollY;
    } else {
        if (!header.classList.contains("navbar-shown")) header.classList.remove("sticky");
    }
}

// ===== Scroll Reveal =====
const sr = ScrollReveal({
    distance: "30px",
    duration: 2000,
    reset: true
});

sr.reveal(".home-content", {delay: 350, origin: "left"});
sr.reveal(".home-img", {delay: 350, origin: "right"});
sr.reveal(".sub-service, .about, .portfolio, .service, .fact", {delay: 200, origin: "bottom"});

// ===== Initial Load =====
navlink_active();
header_sticky();

// ===== Window Scroll Event =====
onscroll = function() {
    navlink_active();
    header_sticky();
}