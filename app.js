// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if(document.body.classList.contains('dark-mode')) {
    icon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    icon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Check for saved dark mode preference when page loads
document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode');
  const toggleButton = document.getElementById('darkModeToggle');
  const icon = toggleButton.querySelector('i');

  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-sun', 'fa-moon');
  }

  // Add click event listener to the button
  toggleButton.addEventListener('click', toggleDarkMode);
});