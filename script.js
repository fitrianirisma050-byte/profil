// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (hash.startsWith('#')) {
      e.preventDefault();
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// AJAX form submit for contact
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());
  const msg = document.getElementById('form-msg');
  msg.textContent = "Mengirim...";
  try {
    const res = await fetch('/send-message', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.status === "success") {
      msg.textContent = result.message;
      this.reset();
    } else {
      msg.textContent = "Gagal mengirim. Silakan coba lagi.";
    }
  } catch (err) {
    msg.textContent = "Gagal mengirim. Cek koneksi.";
  }
});