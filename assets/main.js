$(function() {
  
    // Global Variables
    var score = 0;
    var user = "";
    var highscore = "";
    var timesUp = false;

    // Query selectors for the main page divs, timer, and buttons.
    var highscoresButton = $(".highscores");
    var startQuizButton = $(".start-quiz");
    var timerButton = $(".seconds-left");

    // Selectors for HTML classes
    var cardBody = $(".card-body");
    var cardTitle = $(".card-title");
    var cardText = $(".card-text");
    var button = $(".start-quiz");

    // Variables that hold created elements
    var cardTitleReplacementOneEl = $("<h5 class='card-title'>Question 1:</h5>");
    var cardTitleReplacementTwoEl = $("<h5 class='card-title'>Question 2:</h5>");
    var cardTitleReplacementThreeEl = $("<h5 class='card-title'>Question 3:</h5>");
    var cardTitleReplacementFourEl = $("<h5 class='card-title'>Question 4:</h5>");
    var cardTextReplacementOneEl = $("<p class='card-text'>What is the answer to question 1?</p>");
    var cardTextReplacementTwoEl = $("<p class='card-text'>What is the answer to question 2?</p>");
    var cardTextReplacementThreeEl = $("<p class='card-text'>What is the answer to question 3?</p>");
    var cardTextReplacementFourEl = $("<p class='card-text'>What is the answer to question 4?</p>");
    var buttonOneEl = $("<button type='button' class='answer-button btn btn-light' style='display:block; width: 100%'>Answer</button>");
    var buttonTwoEl = $("<button type='button' class='answer-button btn btn-light' style='display:block; width: 100%'>Answer 2</button>");
    var buttonThreeEl = $("<button type='button' class='answer-button btn btn-light' style='display:block; width: 100%'>Answer 3</button>");
    var buttonFourEl = $("<button type='button' class='answer-button btn btn-light' style='display:block; width: 100%'>Answer 4</button>");

    // Array containing each question to be asked
    var titlesArray = 
    [ 
        "Question 1:",
        "Question 2:",
        "Question 3:",
        "Question 4:"
    ]

    var questionsArray =
    [
        "What is question 1?",
        "What is question 2?",
        "What is question 3?",
        "What is question 4?"
    ]
       
   // Array containing an array of the answers to the question
   var answersArray = [
       
       [
           "CorrectQ1",
           "CorrectQ2",
           "CorrectQ3",
           "CorrectQ4"
       ],
       
       [
           "WrongQ1",
           "WrongQ2",
           "WrongQ3",
           "WrongQ4"
       ],

       [
           "WrongQ1",
           "WrongQ2",
           "WrongQ3",
           "WrongQ4"
       ],

       [
           "WrongQ1",
           "WrongQ2",
           "WrongQ3",
           "WrongQ4",
       ]
   ]        
   // Assigning a value of "correct" to each right answer in order to select for the value later.
   $(answersArray[0][0]).attr("data-value", "correct");
   $(answersArray[0][1]).attr("data-value", "correct");
   $(answersArray[0][2]).attr("data-value", "correct");
   $(answersArray[0][3]).attr("data-value", "correct");

    // Array of the answer buttons to be called on in the answerTextFill function
    var buttonArray = [buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl];

    // // Event listener for highscores button
    highscoresButton.on("click", seeHighscores);
    // On seehighscores click, redirect to the highscores page.
    function seeHighscores() {
        location.href = "highscores.html";
    }
 
    // // The init function is called when the page loads
    // // function init() {
    // //     getHighscore();
    // //     getUser();
    // // }

    $(".start-quiz").on("click", startQuiz);
    
    function startQuiz() {    
    QandA();
    countdown();
    }

    function QandA() {
        cardTitle.hide();
        cardTitle.replaceWith(cardTitleReplacementOneEl);
        cardText.replaceWith(cardTextReplacementOneEl);
        button.replaceWith(buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl);
        answerTextFill();  
        $(".answer-button").on("click", answerCheck);
    }

    function secondQandA() {
        cardTitleReplacementOneEl.replaceWith(cardTitleReplacementTwoEl);
        cardTextReplacementOneEl.replaceWith(cardTextReplacementTwoEl);
        button.replaceWith(buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl);
        answerTextFill();
        $(".answer-button").on("click", answerCheck);
    }

        function answerTextFill() {
            for (var j = 0; j < answersArray.length; j++) {
                var buttonSelector = buttonArray[j];
                $(answersArray[0][j]).attr("value", "correct");
                buttonSelector.text(answersArray[j][j]);
            }        
        }
console.log($(answersArray[0][0]).val())
       
    var responseText = $("<p class='card-text'></p>");
    var nextButton = $("<button type='button' class='answer-button btn btn-light' style='display:block; width: 100%'>Answer</button>");
    // Click handler to parse if correct answer was clicked
    function answerCheck(index) {
        var answerValue = $(this).data("value");
        index = 0

        if (answerValue) {
            score++;
            console.log(score)
            $(this).css("background-color", "green");
            responseText.text("Correct!")
            cardBody.append(responseText);
            cardBody.append(nextButton);

        } else {
            $(this).css("background-color", "red");
            responseText.text("Incorrect. The correct answer was: " + answersArray[0][index] + ".")
            cardBody.append(responseText);
            cardBody.append(nextButton);
        }
        index++;
        // Event handler/function that shows next question
        $(".next-button").on("click", nextQuestion)
        function nextQuestion() {
            nextButton.hide();
            responseText.hide();
            secondQandA();
        }
    }  



    // Countdown function that starts at 60 seconds and counts down to 0
    function countdown() {
        var timeLeft = 60;
        
        var timer = setInterval(function() {
            timeLeft--;
            var timeDisplay = $(timerButton).text(timeLeft);
            
        if (timeLeft > 0) {
            return timeDisplay;
        } else {
            clearInterval(timer);
            timesUp = true;
            return $(timeDisplay).text("Time's Up!")
        }
        }, 1000);
    }
});