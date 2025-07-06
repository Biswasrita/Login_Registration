const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggle-text");
const confirmPassWrapper = document.getElementById("confirm-pass-wrapper");

const firstnameInput = document.getElementById("firstname-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const showPasswordCheckbox = document.getElementById("show-password");

let isSignup = true;

// ✅ Render toggle message and attach listener every time
function renderToggleText() {
  toggleText.innerHTML = isSignup
    ? 'Already have an account? <a href="#" id="toggle-link">Login</a>'
    : 'Don\'t have an account? <a href="#" id="toggle-link">Signup</a>';

  const toggleLink = document.getElementById("toggle-link");
  toggleLink.addEventListener("click", (e) => {
    e.preventDefault();
    isSignup = !isSignup;

    formTitle.textContent = isSignup ? "Signup" : "Login";
    confirmPassWrapper.style.display = isSignup ? "flex" : "none";
    firstnameInput.parentElement.style.display = isSignup ? "flex" : "none";

    renderToggleText(); // re-render the toggle message + event
  });
}

// 🔁 Initial render
renderToggleText();

// 🔒 Show/Hide Password
showPasswordCheckbox.addEventListener("change", () => {
  const type = showPasswordCheckbox.checked ? "text" : "password";
  passwordInput.type = type;
  repeatPasswordInput.type = type;
});

// ✅ Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const firstname = firstnameInput.value.trim();
  const repeatPassword = repeatPasswordInput.value.trim();

  if (!validateEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  if (password.length < 6 || !/\d/.test(password)) {
    alert("Password must be at least 6 characters and include a number.");
    return;
  }

  if (isSignup) {
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ firstname, email, password }));
    alert("Signup successful! You can now log in.");
    isSignup = false;
    formTitle.textContent = "Login";
    confirmPassWrapper.style.display = "none";
    firstnameInput.parentElement.style.display = "none";
    renderToggleText(); // re-render toggle
  } else {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored && stored.email === email && stored.password === password) {
      alert(`Welcome back, ${stored.firstname}!`);
    } else {
      alert("Invalid credentials!");
    }
  }

  form.reset();
});

// 📧 Email Validator
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
