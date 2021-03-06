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
    var score = 0;
    var highscore = 0;
    var userSelection = "";
    var timerButton = $(".seconds-left")
    var quizButton = $(".start-quiz");
    var introduction = $(".introduction");
    var highscoresButton = $(".highscores");
    var body = $("body");
    // // Event listener for highscores button
    highscoresButton.on("click", seeHighscores);
    // On seehighscores click, redirect to the highscores page.
    function seeHighscores() {
        location.href = "highscores.html";
        $(".card-text").text("Your score: " + (score / 4) + ".")
    }

    // On start quiz button click, do the following function
    $(".start-quiz").on("click", function() {
        introduction.hide(); //Hide the introduction container and contents
        createQandAElement(); // Create the question and answers
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

    // Create questions and answers 
    function createQandAElement() {
        var divEl = $("<div>", {id: 'question'});
        divEl.addClass("container-md mx-4 my-4 question-container")
        $("#quiz").append(divEl);

        var cardEl = $("<div>").addClass("card py-4");
        divEl.append(cardEl);

        var h5El = $("<h5>Question " + (questionCount + 1) + ":</h5>");
        h5El.addClass("card-title");
        cardEl.append(h5El);

        var questionEl = $("<p>");
        questionEl.addClass("card-text");
        questionEl.text(questionsObj[questionCount].question);
        cardEl.append(questionEl);

        var answerButtons = "";
        for (var i = 0; i < questionsObj.length; i++) {
            answerButtons = $("<button class='btn btn-light mx-4 my-2 py-3 answer' name='answer'></button>");
            answerButtons.attr("value", questionsObj[i].correctAnswer);
            answerButtons.text(questionsObj[questionCount].choices[i]);
            cardEl.append(answerButtons);
        }

        $(".answer").on("click", userChoice);

        var nextQuestionButton = $("<button>Next</button>");
        nextQuestionButton.addClass("next btn btn-light mx-4 my-2");
        cardEl.append(nextQuestionButton);
        $(".next").on("click", nextQuestion);
        return divEl;
    };

    // On clicking next, display the next question
    // $(".next").on("click", function () {
        
    // });

    function nextQuestion(e) {
        e.preventDefault();
        $("#question").hide()
        if (questionCount === 3) {
            showHighScores();
        } else {
            questionCount++;
            createQandAElement();
            return;
        }
    }

    function userChoice(e) {
        e.preventDefault();
        userSelection = $(this).val();
        var body = $("body");
        var response = $("<p class='response'></p>")
        
        body.append(response);

        if (userSelection == questionsObj[questionCount].correctAnswer) {
            $(this).css("background-color", "green");
            alert("Correct! Click next to continue")
            $(".response").text("Question " + [questionCount + 1] + ": Correct answer! Click next to continue");
            score++;
            return;
        } else {
            $(this).css("background-color", "red");
            alert("Question " + [questionCount + 1] + ": Wrong answer. The correct answer was " + questionsObj[questionCount].correctAnswer + ". Click next to continue.")
            $(".response").text("Question " + [questionCount + 1] + ": Wrong answer. The correct answer was " + questionsObj[questionCount].correctAnswer + ". Click next to continue.")
            return;
        }
    }

    function showHighScores() {
        highscore = (score / 4);
        seeHighscores();
    }
});