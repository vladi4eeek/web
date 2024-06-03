document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supportForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            formMessage.textContent = 'Будь ласка, заповніть всі поля.';
            formMessage.style.color = 'red';
            return;
        }

        if (!validateEmail(email)) {
            formMessage.textContent = 'Будь ласка, введіть правильний email.';
            formMessage.style.color = 'red';
            return;
        }

        formMessage.textContent = 'Дякуємо за ваше повідомлення! Ми зв’яжемося з вами найближчим часом.';
        formMessage.style.color = 'green';
        form.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
