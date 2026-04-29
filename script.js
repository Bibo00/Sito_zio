//--------------SCRIPT HEADER----------------
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');
const closeMenu = document.getElementById('close-menu');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

mobileMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

//Chiudi il menu quando si clicca su un link (utile per mobile)
const navLinks = document.querySelectorAll('.nav-link-item');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});
//--------------FINE SCRIPT HEADER----------------