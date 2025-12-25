let mode = "login";

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const authBtn = document.getElementById("authBtn");
const switchBtn = document.getElementById("switchMode");
const authTitle = document.getElementById("authTitle");
const authSubtitle = document.getElementById("authSubtitle");
const switchText = document.getElementById("switchText");

/* Initial state */
nameInput.style.display = "none";

/* Switch Login / Signup */
switchBtn.onclick = () => {
  mode = mode === "login" ? "signup" : "login";

  if (mode === "signup") {
    nameInput.style.display = "block";
    authTitle.textContent = "Create Account";
    authSubtitle.textContent = "Sign up to get started";
    authBtn.textContent = "Sign Up";
    switchText.textContent = "Already have an account?";
    switchBtn.textContent = "Login";
  } else {
    nameInput.style.display = "none";
    authTitle.textContent = "Welcome Back";
    authSubtitle.textContent = "Login to continue";
    authBtn.textContent = "Login";
    switchText.textContent = "Don't have an account?";
    switchBtn.textContent = "Sign up";
  }
};

/* Auth submit */
authBtn.onclick = () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const name = nameInput.value.trim();

  if (!email || !password || (mode === "signup" && !name)) {
    alert("Please fill all fields");
    return;
  }

  if (mode === "signup") {
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");
    location.href = "dashboard.html";
  } else {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      alert("Invalid credentials");
      return;
    }
    localStorage.setItem("isLoggedIn", "true");
    location.href = "dashboard.html";
  }
};
