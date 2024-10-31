//toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if(document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-moon', 'fa-sun');  // Changed this line
    localStorage.setItem('darkMode', 'enabled');
  } else {
    icon.classList.replace('fa-sun', 'fa-moon');  // Changed this line
    localStorage.setItem('darkMode', 'disabled');
  }
}

//check for saved dark mode preference
document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode');
  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');  // Changed this line
  }

  //listener for the button
  toggleButton.addEventListener('click', toggleDarkMode);
});

// app.js

document.getElementById('mobile-menu').addEventListener('click', function() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active'); // Toggle the active class
});