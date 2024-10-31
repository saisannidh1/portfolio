function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const toggleButton = document.getElementById('darkModeToggle');
  if(document.body.classList.contains('dark-mode')) {
    toggleButton.textContent = 'Enable Light Mode';
    localStorage.setItem('darkMode', 'enabled');
  } else {
    toggleButton.textContent = 'Enable Dark Mode';
    localStorage.setItem('darkMode', 'disabled');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode');
  const toggleButton = document.getElementById('darkModeToggle');

  if (darkModePreference === 'disabled') {
    document.body.classList.remove('dark-mode');
    toggleButton.textContent = 'Enable Dark Mode';
  } else {
    toggleButton.textContent = 'Enable Light Mode';
  }
});