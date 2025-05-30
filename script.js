const toggleBtn = document.getElementById('theme-toggle');
const logo = document.getElementById('logo');

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const isDark = savedTheme === 'dark';

  if (isDark) {
    document.body.classList.add('dark-theme');
    toggleBtn.textContent = '☀️';
    logo.src = 'logo-dark.png';
  } else {
    toggleBtn.textContent = '🌙';
    logo.src = 'logo-light.png';
  }
});

toggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');

  toggleBtn.textContent = isDark ? '☀️' : '🌙';
  logo.src = isDark ? 'logo-dark.png' : 'logo-light.png';

  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

var typed = new Typed("#typed", {
  strings: ["Avik Kayal", "a Graphics Designer", "a Web Developer", "a Storyteller"],
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 2000, // Holds the text for 2 seconds
  loop: true
});

window.onscroll = function () {
    const progressBar = document.getElementById('scroll-progress');
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  };