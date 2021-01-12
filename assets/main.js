// Query selector for the start quiz button on the main page.
var pageChange = document.querySelector(".start-quiz");
var timerEl = document.querySelector(".seconds-left");

// Global Variables
var score = 0;
var user = "";
var highscore = "";
var timesUp = false;
    
// The init function is called when the page loads
// function init() {
//     getHighscore();
//     getUser();
// }

// Event listener for start quiz button
pageChange.addEventListener("click", changePage);

// On start quiz click, redirect to the quiz page.
function changePage() {
    location.href = "questionpage.html";
    countdown();
}

// Countdown function that starts at 60 seconds and counts down to 0
function countdown() {
    var timeLeft = 60;
    
    var timer = setInterval(function() {
        timeLeft--;
        timerEl.textContent = timeLeft;
        
    if (timeLeft > 0) {
        return timerEl.textContent;
    } else {
        clearInterval(timer);
        timesUp = true;
        return timerEl.textContent = "Time's up!";
    }
    }, 1000);
}
countdown();

// function question() {
//     var questionOne = document.querySelector(".question1");
// }

// Creates a div eith text content and button element after the user's answer
var divEl = document.createElement("div");
divEl.setAttribute("class", "answer-container");
var nextQuestionButtonEl = document.createElement("button");
nextQuestionButtonEl.setAttribute("class", "next-button");

// Selects class for button with the correct answer and button with the wrong answer
var questionContainer = document.querySelector(".question-container");
var correctAnswer = document.querySelector(".correct");
var wrongAnswer = document.querySelector(".wrong");
var correctAnswerClicked = false;
var wrongAnswerClicked = false;

// Event listener for the above variables 
correctAnswer.addEventListener("click", userCorrectAnswer);
// wrongAnswer.addEventListener("click", userWrongAnswer);

function userCorrectAnswer(event) {
    // var correct = event.target.getAttribute("value", "true");
    // var incorrect = event.target.getAttribute("value", "false");
    correctAnswerClicked = true;

    if (correctAnswerClicked) {
        score++;

        correctAnswer.style.backgroundColor = "green";
        divEl.textContent = "Correct Answer!";
        nextQuestionButtonEl.textContent = "Next";
        questionContainer.appendChild(divEl);
        divEl.appendChild(nextQuestionButtonEl);
        return
    }

    if (incorrect != true) {
        wrongAnswer.style.backgroundColor = "red";
        divEl.textContent = "Wrong Answer. The correct answer was " + correctAnswer.textContent;
        nextQuestionButtonEl.textContent = "Next";
        questionContainer.appendChild(divEl);
        divEl.appendChild(nextQuestionButtonEl);
        return
    }
    console.log(score);
    // Need to put in function that adds score to total.
}

function userWrongAnswer() {
    wrongAnswerClicked = true;

    if (wrongAnswerClicked) {
        wrongAnswer.style.backgroundColor = "red";
        divEl.textContent = "Wrong Answer. The correct answer was " + correctAnswer.textContent;
        nextQuestionButtonEl.textContent = "Next";
        questionContainer.appendChild(divEl);
        divEl.appendChild(nextQuestionButtonEl);

    }
}

var questionOne = document.querySelector(".question1");
var questionTwo = document.querySelector(".question2");
var questionThree = document.querySelector(".question3");
var questionFour = document.querySelector(".question4");
var questionArray = [questionOne, questionTwo, questionThree, questionFour];

nextQuestionButtonEl.addEventListener("click", secondQuestion);

function secondQuestion() {
    // questionOne.style.display = "none";
    // questionTwo.style.display = "block";
    
    for (var i = 0; i < questionArray.length; i++) {
        var hideDiv = questionArray[i];
        hideDiv.style.display = "none";
        break;
        // questionArray[i].style.display = "none";
        // questionArray[i + 1].style.display = "block";
    }

    for (var i = 1; i < questionArray.length; i++) {
        var showDiv = questionArray[i];
        showDiv.style.display = "block";
        break;
        // questionArray[i].style.display = "none";
        // questionArray[i + 1].style.display = "block";
    }
    userCorrectAnswer();
    userWrongAnswer();
}

// nextQuestionButtonEl.addEventListener("click", thirdQuestion);

// function thirdQuestion() {
//     questionTwo.style.display = "none";
//     questionThree.style.display = "block";
//     userCorrectAnswer();
//     userWrongAnswer();
// }

// nextQuestionButtonEl.addEventListener("click", fourthQuestion);

// function fourthQuestion() {
//     questionOne.style.display = "none";
//     questionTwo.style.display = "block";
//     userCorrectAnswer();
//     userWrongAnswer();
// }