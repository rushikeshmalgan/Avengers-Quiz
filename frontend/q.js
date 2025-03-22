const questions = [
    { 
        question: "What is your greatest strength?", 
        options: ["Bravery", "Intelligence", "Strength", "Agility", "Leadership", "Stealth", "Strategy", "Determination", "Kindness"],
        scores: {"Captain America": 5, "Iron Man": 4, "Hulk": 5, "Spider-Man": 3, "Thor": 4, "Black Widow": 3, "Doctor Strange": 4, "Black Panther": 4, "Hawkeye": 3}
    },
    { 
        question: "Which weapon would you choose?", 
        options: ["Shield", "Suit", "Hammer", "Bow & Arrow", "Martial Arts", "Magic", "Web-Shooters", "Vibranium Claws", "Fists"],
        scores: {"Captain America": 5, "Iron Man": 5, "Thor": 5, "Hawkeye": 4, "Black Widow": 4, "Doctor Strange": 5, "Spider-Man": 4, "Black Panther": 4, "Hulk": 5}
    },
    { 
        question: "What motivates you the most?", 
        options: ["Justice", "Innovation", "Honor", "Revenge", "Protecting Others", "Knowledge", "Responsibility", "Legacy", "Power"],
        scores: {"Captain America": 5, "Iron Man": 4, "Thor": 4, "Hulk": 3, "Hawkeye": 3, "Black Widow": 3, "Doctor Strange": 5, "Black Panther": 4, "Spider-Man": 5}
    },
    { 
        question: "What is your biggest weakness?", 
        options: ["Stubbornness", "Ego", "Anger", "Overconfidence", "Trust Issues", "Self-Doubt", "Arrogance", "Recklessness", "Impulsiveness"],
        scores: {"Captain America": 4, "Iron Man": 5, "Thor": 3, "Hulk": 5, "Hawkeye": 3, "Black Widow": 3, "Doctor Strange": 4, "Black Panther": 3, "Spider-Man": 5}
    },
    { 
        question: "Which battle strategy suits you?", 
        options: ["Defense", "Technology", "Brute Force", "Stealth", "Magic", "Speed", "Tactical Planning", "Precision"],
        scores: {"Captain America": 5, "Iron Man": 5, "Hulk": 4, "Black Widow": 4, "Doctor Strange": 5, "Spider-Man": 5, "Black Panther": 4, "Hawkeye": 4, "Thor": 4}
    },
    { 
        question: "How do you handle conflict?", 
        options: ["Diplomacy", "Science", "Fighting", "Planning", "Surprise Attacks", "Magic", "Cunning Tactics", "Stealth", "Brute Strength"],
        scores: {"Captain America": 5, "Iron Man": 5, "Thor": 4, "Hulk": 4, "Black Widow": 4, "Doctor Strange": 5, "Black Panther": 4, "Hawkeye": 3, "Spider-Man": 4}
    },
    { 
        question: "What is your dream?", 
        options: ["Peace", "Innovation", "Glory", "Freedom", "Redemption", "Knowledge", "Justice", "Adventure", "Power"],
        scores: {"Captain America": 5, "Iron Man": 5, "Thor": 4, "Hulk": 3, "Hawkeye": 3, "Black Widow": 3, "Doctor Strange": 5, "Black Panther": 5, "Spider-Man": 4}
    }
];

let currentQuestionIndex = 0;
let scores = {
    "Captain America": 0, "Iron Man": 0, "Thor": 0, "Hulk": 0, 
    "Hawkeye": 0, "Black Widow": 0, "Doctor Strange": 0, 
    "Black Panther": 0, "Spider-Man": 0
};

function loadQuestion() {
    let questionText = document.getElementById("question-text");
    let buttons = document.querySelectorAll(".choice-btn");
    let progressBar = document.getElementById("progress-bar");

    let currentQ = questions[currentQuestionIndex];
    questionText.innerText = currentQ.question;

    buttons.forEach((btn, index) => {
        btn.innerText = currentQ.options[index];
        btn.style.display = "block";
        btn.onclick = () => selectAnswer(currentQ.scores, index);
    });

    progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(scoreMap, index) {
    let selectedOption = Object.keys(scoreMap)[index];

    if (selectedOption) {
        scores[selectedOption] += scoreMap[selectedOption];
    }

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    let container = document.getElementById("quiz-container");
    let highestScore = Math.max(...Object.values(scores));
    let avenger = Object.keys(scores).find(hero => scores[hero] === highestScore);

    container.innerHTML = `
        <h2>You are...</h2>
        <h1 style="color: gold;">${avenger}!</h1>
        <img src="images/${avenger.toLowerCase().replace(" ", "-")}.png" width="200px">
        <p style="font-size: 1.2rem;">Your personality matches ${avenger}! Embrace your inner hero.</p>
        <button id="know-more-btn" onclick="window.location.href='avengers-details.html'">Know More</button>
    `;

    document.getElementById("know-more-btn").style = `
        background: linear-gradient(to right, #ffcc00, #ff3300);
        color: white;
        border: none;
        padding: 12px 18px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 6px;
        transition: all 0.3s ease;
        margin-top: 20px;
        text-transform: uppercase;
    `;

    document.getElementById("know-more-btn").onmouseover = function () {
        this.style.background = "linear-gradient(to right, #ff6600, #ffcc00)";
        this.style.boxShadow = "0 0 30px rgba(255, 204, 0, 0.9)";
        this.style.transform = "scale(1.1)";
    };
}

// Start Quiz
loadQuestion();
