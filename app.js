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

document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode');
  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggleButton.addEventListener('click', toggleDarkMode);
});