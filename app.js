function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if(document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Dark mode initialization (previous code)
  const darkModePreference = localStorage.getItem('darkMode');
  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggleButton.addEventListener('click', toggleDarkMode);

  // Mobile menu functionality
  const mobileMenuButton = document.querySelector('.mobile-menu');
  const nav = document.querySelector('nav');

  mobileMenuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuButton.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenuButton.classList.remove('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuButton.contains(e.target) && nav.classList.contains('active')) {
      nav.classList.remove('active');
      mobileMenuButton.classList.remove('active');
    }
  });
});