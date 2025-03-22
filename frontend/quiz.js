document.addEventListener("DOMContentLoaded", function () {
    let introVideo = document.getElementById("intro-video");
    let skipButton = document.getElementById("skip-btn");
    let nextButton = document.getElementById("next-btn"); // Button to go to q.html

    // Function to hide the intro and show the next button
    function skipIntro() {
        let introContainer = document.getElementById("intro-container");
        let quizContainer = document.getElementById("quiz-container");
        let bgVideo = document.getElementById("background-video");

        introContainer.style.display = "none"; // Hide intro
        bgVideo.style.opacity = "1"; // Show background video
        bgVideo.play();
        quizContainer.style.opacity = "1"; // Show quiz container
        quizContainer.style.transform = "translateY(0)";
    }

    // Play background video after intro ends
    if (introVideo) {
        introVideo.addEventListener("ended", skipIntro);
    }

    // Skip button functionality
    if (skipButton) {
        skipButton.addEventListener("click", function () {
            introVideo.pause();
            skipIntro();
        });
    }

    // Redirect to q.html when "Next" button is clicked
    if (nextButton) {
        nextButton.addEventListener("click", function () {
            window.location.href = "q.html";
        });
    }
});
