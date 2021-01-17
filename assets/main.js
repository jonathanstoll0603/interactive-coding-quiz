$().ready(function() {
    var questionsObj = [{
      question: "What is question 1?",
      choices: ["a1", "b1", "c1", "d1"],
      correctAnswer: "a1"
    }, {
      question: "What is question 2?",
      choices: ["a2", "b2", "c2", "d2"],
      correctAnswer: "b2"
    }, {
      question: "What is question 3?",
      choices: ["a3", "b3", "c3", "d3"],
      correctAnswer: "c3"
    }, {
      question: "What is question 4?",
      choices: ["a4", "b4", "c4", "d4"],
      correctAnswer: "d4"
    }];

    var questionCount = 0; // counts which question user is on
    var userSelections = []; // array containing user choices
    var score = 0;
    var quizOver = false;
    var timerButton = $(".seconds-left")
    var quizButton = $(".start-quiz");
    var introduction = $(".introduction");
    var highscoresButton = $(".highscores");
    var quiz = $("#quiz");

    // // Event listener for highscores button
    highscoresButton.on("click", seeHighscores);
    // On seehighscores click, redirect to the highscores page.
    function seeHighscores() {
        location.href = "highscores.html";
    }

    // On start quiz button click, do the following function
    $(".start-quiz").on("click", function() {
        introduction.hide(); //Hide the introduction container and contents
        createQandAElement(); // Create the question and answers
        showNextQuestion(); // Display the question
        countdown(); // Start the countdown timer
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

    function createQandAElement() {
        var index = 0;

        var divEl = $("<div>", {id: 'question'});
        divEl.addClass("container-md mx-4 my-4 question-container")
        $("#quiz").append(divEl);

        var cardEl = $("<div>").addClass("card py-4");
        divEl.append(cardEl);

        var h5El = $("<h5>Question " + (index + 1) + ":</h5>");
        h5El.addClass("card-title");
        cardEl.append(h5El);

        var questionEl = $("<p>");
        questionEl.addClass("card-text");
        questionEl.text(questionsObj[index].question);
        cardEl.append(questionEl);

        var answerButtons = "";
        for (var i = 0; i < questionsObj.length; i++) {
            answerButtons = $("<button class='btn btn-light mx-4 my-2 py-3 answer' name='answer'></button>");
            answerButtons.attr("id", questionsObj[index].correctAnswer);
            answerButtons.text(questionsObj[index].choices[i]);
            cardEl.append(answerButtons);
        }

        $(".answer").on("click", userChoice);

        var nextQuestionButton = $("<button>Next</button>");
        nextQuestionButton.addClass("next btn btn-light mx-4 my-2");
        cardEl.append(nextQuestionButton);
        index++;
        questionCount++
        return divEl;
    };

    // On clicking next, display the next question
    // $(".next").on("click", function () {
        
    // });


    $(".next").on("click", function(e) {
        e.preventDefault();
        if (userSelections[questionCount] == isNaN) {
            alert("Please make a selection");
        } else {
            questionCount++
            showNextQuestion();
        }
    })

    function userChoice(e) {
        e.preventDefault();
        var index = 0;
        if ($(this).id == questionsObj[0].correctAnswer) {
            alert("Correct")
        } else {
            alert("Wrong")
        }
        index++;
    }

    function showNextQuestion() {
        $("#question").remove();

        if (questionCount < questionsObj.length) {
            var nextQuestion = createQandAElement(questionCount);
            quiz.append(nextQuestion);

        }
    }
    // Click handler for the 'next' button
    // $('.next').on('click', function (e) {
    //     e.preventDefault();
    //     choose();
      
    //     // If no user selection, progress is stopped
    //     if (userSelections[questionCount] == isNaN) {
    //         alert('Please make a selection!');
    //     } else {
    //         questionCounter++;
    //         displayNext();
    //     }
    // });  

});