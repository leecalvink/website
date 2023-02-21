// Get the button and add a click event listener
const button = document.getElementById('dark-mode-toggle');
button.addEventListener('click', function() {
  // Get the root element and toggle the dark mode class
  const root = document.documentElement;
  root.classList.toggle('dark-mode');

  // Save the setting using web storage
  const isDarkModeEnabled = root.classList.contains('dark-mode');
  localStorage.setItem('isDarkModeEnabled', isDarkModeEnabled);
});
