// js/form.js
// Initialize EmailJS
(function () {
    emailjs.init("MZWNXxfmfGy-c_FO9");
  })();
  
  export function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById('contactForm');
    const msgEl = document.getElementById('formMessage');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    msgEl.className = 'form-message'; msgEl.textContent = '';
  
    const params = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value,
      message: form.message.value,
      to_email: 'info@wakacanada.net'
    };
  
    emailjs.send('service_4dke18j','template_zmvspqv',params)
      .then(() => {
        msgEl.className = 'form-message success';
        msgEl.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      })
      .catch(err => {
        msgEl.className = 'form-message error';
        msgEl.textContent = 'Oops! Something went wrong.';
        console.error('EmailJS error:', err);
      })
      .finally(() => {
        btn.disabled = false; btn.textContent = 'Send Message';
      });
  
    return false;
  }
  