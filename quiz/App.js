const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "/*", "#", "--"],
        answer: "//"
    },
    {
        question: "What is the output of typeof null in JavaScript?",
        options: ["object", "null", "undefined", "string"],
        answer: "object"
    },
    {
        question: "Which method is used to remove the last element from an array and returns that element in JavaScript?",
        options: ["pop()", "shift()", "push()", "unshift()"],
        answer: "pop()"
    },
    {
        question: "What is the result of the expression '3' + 2 in JavaScript?",
        options: ["32", "5", "6", "Error"],
        answer: "32"
    },
    {
        question: "Which built-in method returns the length of a string in JavaScript?",
        options: ["length()", "size()", "index()", "None of the above"],
        answer: "length()"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        options: ["Node.js", "TypeScript", "npm", "Java Development Kit"],
        answer: "npm"
    },
    {
        question: "What is the output of console.log(typeof []) in JavaScript?",
        options: ["array", "object", "array-like", "undefined"],
        answer: "object"
    },
    {
        question: "Which keyword is used to declare variables in JavaScript?",
        options: ["let", "var", "const", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "What is the result of 3 + '3' in JavaScript?",
        options: ["6", "33", "9", "Error"],
        answer: "33"
    },
    {
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "JavaScript Objectified Notation", "Java Serialized Object Notation"],
        answer: "JavaScript Object Notation"
    },
    {
        question: "Which function is used to parse a JSON string in JavaScript?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.serialize()", "JSON.decode()"],
        answer: "JSON.parse()"
    }
];

let currentQuestion = 0;
let score = 0;
let correctAnswers = []; // Array to store correct answers
let incorrectAnswers = []; // Array to store incorrect answers

const questionElement = document.getElementById("question");
const optionsForm = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");

function displayQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsForm.innerHTML = "";

    // Shuffle options array
    const shuffledOptions = q.options.sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((option, index) => {
        const label = document.createElement("label");
        label.innerHTML = `
            <input type="radio" name="option" value="${option}">
            ${option}
        `;
        optionsForm.appendChild(label);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked').value;
    const q = questions[currentQuestion];
    if (selectedOption === q.answer) {
        score++;
        correctAnswers.push(currentQuestion + 1); // Store the question number if answered correctly
    } else {
        incorrectAnswers.push(currentQuestion + 1); // Store the question number if answered incorrectly
    }
}

function nextQuestion() {
    checkAnswer();
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        enableLifelines(); // Enable lifelines for the next question
    } else {
        showResult();
    }
}
function showResult() {
    resultElement.style.display = "block";
    resultElement.querySelector("#score").textContent = `Score: ${score} out of ${questions.length}`;
    resultElement.querySelector("#correct-answers").textContent = `Correct Answers: ${correctAnswers.join(", ")}`;

    const incorrectAnswersElement = resultElement.querySelector("#incorrect-answers");
    incorrectAnswersElement.innerHTML = ""; // Clear previous content

    // Create a table to display incorrect questions and their correct answers
    const table = document.createElement("table");
    const tableHeader = document.createElement("tr");
    const questionHeader = document.createElement("th");
    const answerHeader = document.createElement("th");
    questionHeader.textContent = "Question";
    answerHeader.textContent = "Correct Answer";
    tableHeader.appendChild(questionHeader);
    tableHeader.appendChild(answerHeader);
    table.appendChild(tableHeader);

    // Populate the table with incorrect questions and their correct answers
    incorrectAnswers.forEach(questionNumber => {
        const q = questions[questionNumber - 1]; // Adjust index
        const row = document.createElement("tr");
        const questionCell = document.createElement("td");
        const answerCell = document.createElement("td");
        questionCell.textContent = `${questionNumber}. ${q.question}`;
        answerCell.textContent = q.answer;
        row.appendChild(questionCell);
        row.appendChild(answerCell);
        table.appendChild(row);
    });

    // Append the table to the result element
    incorrectAnswersElement.appendChild(table);

    // Display result text
    const resultTextElement = document.createElement("p");
    resultTextElement.id = "result-text";
    if (score >= 5) {
        resultTextElement.textContent = "Congratulations! You have passed.";
        resultTextElement.style.color = "green";
    } else {
        resultTextElement.textContent = "Sorry! You have failed.";
        resultTextElement.style.color = "red";
    }
    resultTextElement.style.fontSize = "20px"; // Increase font size
    resultElement.appendChild(resultTextElement);

    console.log("Score:", score);
    console.log("Correct Answers:", correctAnswers);
    console.log("Incorrect Answers:", incorrectAnswers);
}

function useFiftyFifty() {
    const q = questions[currentQuestion];
    const correctAnswer = q.answer;
    const options = q.options.filter(option => option !== correctAnswer);
    const randomIndex = Math.floor(Math.random() * options.length);
    const randomOption = options[randomIndex];

    const radioButtons = optionsForm.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
        if (radioButton.value !== randomOption && radioButton.value !== correctAnswer) {
            radioButton.closest('label').style.display = "none";
        }
    });

    // Disable the lifeline button after usage
    document.getElementById("fifty-fifty").disabled = true;
}


function enableLifelines() {
    // Enable lifeline buttons for the next question
    document.getElementById("fifty-fifty").disabled = false;
   
}

displayQuestion();
