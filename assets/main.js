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
    var cardTitle = $(".card-title");
    var cardText = $(".card-text");
    var button = $(".start-quiz");

    // Variables that hold created elements
    var cardTitleReplacementEl = $("<h5 class='card-title'>Card Title</h5>");
    var cardTextReplacementEl = $("<p class='card-text'>Card Text</p>")
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
   $(answersArray[0][0]).attr("value", "correct");
   $(answersArray[0][1]).attr("value", "correct");
   $(answersArray[0][2]).attr("value", "correct");
   $(answersArray[0][3]).attr("value", "correct");
 
    $(".start-quiz").on("click", startQuiz);
    
    function startQuiz() {    
    firstQandA();
    countdown();
    }

    function firstQandA() {
        cardTitle.replaceWith(cardTitleReplacementEl);
        cardText.replaceWith(cardTextReplacementEl);
        button.replaceWith(buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl);
        questionTextFill();
    }

    // Array of the answer buttons to be called on in the answerTextFill function
    var buttonArray = [buttonOneEl, buttonTwoEl, buttonThreeEl, buttonFourEl];

    // Function that is used to fill the text of each question on the quiz
    function questionTextFill() {
        var questionNumber = cardTitleReplacementEl;
        var questionText = cardTextReplacementEl;
        // Function that loops through titles and questions array to find text to fill above
        for (var i = 0; i < titlesArray.length; i++) {
            questionNumber.text(titlesArray[i]);
            questionText.text(questionsArray[i]);
            break;
        }
        // function that is used to loop through the answersArray inner array to select the text for the answer btns
        function answerTextFill() {
            for (var j = 0; j < answersArray.length; j++) {
                var buttonSelector = buttonArray[j];
                buttonSelector.text(answersArray[j][j]);
            }        
        }
    answerTextFill();
    }   

    // Click handler to parse if correct answer was clicked
    $("answersArray").click(function() {
        var answerValue = $(this).val();
        console.log(answerValue)
        
        if (answerValue === "correct") {
            console.log("It worked!");
        } else {
            console.log("it didnt work..")
        }
    })    
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
// function displayQuestion() {

//     var QuestionContainerEl = $("<div class='container-md mx-4 my-4 question-container'></div>");
//     $("body").append(QuestionContainerEl);
//     var divCardEl = $("<div class='card d-block' style='width:50rem'</div>");
//     QuestionContainerEl.append(divCardEl);
//     var ulListEl = $("<ul class='list-group list-group-flush answers'></ul>");
//     divCardEl.append(ulListEl);
//     var buttonEl = $("<button type='button' class='btn btn-light'></button>");
//     ulListEl.append(buttonEl);
//     var liListEl = $("<li class='list-group-item py-4 answer-text'></li>");
//     buttonEl.append(liListEl);
//     var qEl = questionsObject.questionList;
//     var aEl = answersObject.answerContainer;
//     console.log(qEl, aEl);

// //    for (var i = 0; i < 1; i++) {
// //         // qEl[i];
// //         divCardEl.text(qEl[i]);
// //     }
// //         for (var j = 0; j < 4; i++) {
// //             // aEl[j];
// //             buttonEl.text(aEl[i]);
// //             // break;
// //         }
// //         return 
// } 
// // The init function is called when the page loads
// // function init() {
// //     getHighscore();
// //     getUser();
// // }

// // Event listener for highscores button
// highscoresButton.addEventListener("click", seeHighscores);
// // On seehighscores click, redirect to the highscores page.
// function seeHighscores() {
//     location.href = "highscores.html";
// }

// // Event listener for start quiz button
// startQuizButton.addEventListener("click", startQuiz);
// // on startquiz button click, hide current div and show first question
// function startQuiz() {
//     countdown();
//     displayQuestion();
// }

    // var questionOneObj = {
    //     questionContainerDivEl: $("<div class='container-md mx-4 my-4 question-container'></div>"),
    //     questionDivEl: $("<div class='question-text card d-block' style='display:block'>Question Blah..</div>"),
    //     ulEl: $("<ul class='unorganized-list list-group list-group-flush' style='display:block'></ul>"),
    //     buttonElOne: $("<button type='button' class='answer-button btn btn-light' style='display:block'></button>"),
    //     liElOne: $("<li class='answer-text list-group-item py-4' style='display:block; text-align: center'>Answer</li>")
    // }

    // function createQandA() {
    //     for (var propt in questionOneObj) {
    //         questionOneObj[propt].append(questionContainerDivEl);
    //     }
    // }
});