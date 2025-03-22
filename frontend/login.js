const API_URL = "http://127.0.0.1:5000";

// Play Thunder Sound when hammer drops
window.onload = function () {
    setTimeout(() => {
        const thunderSound = document.getElementById("thunder-sound");
        if (thunderSound) {
            thunderSound.play();
        }
        document.body.style.animation = "shake 0.5s ease-in-out";
    }, 1000); // Delay to match animation
};

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginStatus = document.getElementById("login-status");

    // Check for empty fields
    if (!username || !password) {
        loginStatus.textContent = "Please enter both username and password.";
        loginStatus.style.color = "red";
        return;
    }

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token); // Store JWT token
            loginStatus.textContent = "Login successful!";
            loginStatus.style.color = "green";

            setTimeout(() => {
                window.location.href = "quiz.html"; // Redirect to quiz.html
            }, 1000);
        } else {
            loginStatus.textContent = data.error || "Invalid credentials.";
            loginStatus.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        loginStatus.textContent = "Server error. Please try again.";
        loginStatus.style.color = "red";
    });
}
