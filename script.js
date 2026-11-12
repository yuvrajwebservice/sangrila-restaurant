/* Navigation toggle for mobile */
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navList.classList.toggle('open');
});

/* Reservation Modal */
const modal = document.getElementById('reserveModal');
const openButtons = document.querySelectorAll('#reserveOpen, #reserveOpenHero, #reserveOpenAbout');
const closeBtn = modal.querySelector('.modal-close');

openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('input').focus();
    });
});

closeBtn.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
});

/* Simple form handling (demo only) */
function handleForm(form, messageEl) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Basic validation
        const required = form.querySelectorAll('[required]');
        let allValid = true;
        required.forEach(inp => {
            if (!inp.value.trim()) {
                allValid = false;
                inp.classList.add('invalid');
            } else {
                inp.classList.remove('invalid');
            }
        });
        if (allValid) {
            messageEl.textContent = 'Thank you! Your reservation request has been sent.';
            form.reset();
        } else {
            messageEl.textContent = 'Please fill in all required fields.';
        }
    });
}
handleForm(document.getElementById('reservationForm'), document.getElementById('formMessage'));
handleForm(document.getElementById('modalReservationForm'), document.getElementById('modalMessage'));

/* Scroll reveal using IntersectionObserver */
const revealElements = document.querySelectorAll('[data-reveal]');
const observerOptions = {
    threshold: 0.1
};
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
revealElements.forEach(el => revealObserver.observe(el));

/* Add data-reveal attributes to sections for animation */
document.querySelectorAll('.section').forEach(sec => sec.setAttribute('data-reveal', ''));

/* Simple review auto‑slide */
let reviewIndex = 0;
const reviews = document.querySelectorAll('.review');
function showReview(idx) {
    reviews.forEach((r, i) => {
        r.style.display = i === idx ? 'block' : 'none';
    });
}
function nextReview() {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    showReview(reviewIndex);
}
showReview(reviewIndex);
setInterval(nextReview, 8000);
