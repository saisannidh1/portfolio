const darkModeToggle = document.getElementById('darkModeToggle');

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});