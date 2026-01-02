// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

const quoteForm = document.getElementById('quote-form');
const status = document.getElementById('form-status');

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('submit-btn');
        const data = new FormData(e.target);
        
        btn.innerText = "ENCRYPTING...";
        btn.disabled = true;

        fetch(e.target.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Thank you for your interest in our services. Our engineers will reach out to you shortly.";
                status.style.color = "var(--accent)"; // Cyber Lime
                quoteForm.reset();
                btn.innerText = "SENT";
            } else {
                status.innerHTML = "ERROR: Protocol failed. Please try again.";
                status.style.color = "#ff4d4d";
                btn.innerText = "RETRY";
                btn.disabled = false;
            }
        }).catch(error => {
            status.innerHTML = "CONNECTION INTERRUPTED.";
            status.style.color = "#ff4d4d";
            btn.disabled = false;
        });
    });
}

