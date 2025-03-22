const API_URL = "http://127.0.0.1:5000";

// Play Web-Sling Sound when animation starts
window.onload = function () {
    setTimeout(() => {
        const webSound = document.getElementById("web-sound");
        if (webSound) {
            webSound.play();
        }
    }, 300); // Delay matches animation timing
};

function signup() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const signupStatus = document.getElementById("signup-status");

    // Clear previous messages
    signupStatus.innerHTML = "";

    // Input validation
    if (!username || !password) {
        signupStatus.textContent = "Please enter a username and password.";
        signupStatus.style.color = "red";
        return;
    }

    fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            signupStatus.textContent = "Signup successful! You can now log in.";
            signupStatus.style.color = "green";

            // Add "Go to Login" button dynamically
            const loginButton = document.createElement("button");
            loginButton.textContent = "Go to Login";
            loginButton.style.marginTop = "10px";
            loginButton.style.padding = "8px 16px";
            loginButton.style.fontSize = "16px";
            loginButton.style.cursor = "pointer";
            loginButton.onclick = () => window.location.href = "login.html";

            signupStatus.appendChild(document.createElement("br")); // Line break
            signupStatus.appendChild(loginButton);
        } else {
            signupStatus.textContent = data.error || "Signup failed.";
            signupStatus.style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        signupStatus.textContent = "Server error. Please try again.";
        signupStatus.style.color = "red";
    });
}
