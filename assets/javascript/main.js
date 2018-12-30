$(document).ready(function () {

    // start the game when user clicks on Start button
    $("#start-button").on("click", gameState.startTimer);
    $("#end-page").hide();
    
});

// information about the state of game play
var gameState = {

    // set the time at 60 seconds, and count down by 1 second
    timeRemaining: 60,

    // start the timer, hide the start page, show the questions
    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        $("#coding-gif").show();
        $("#Web-Gif").hide();
        
     
        trivia.displayQuestions();
    },

    // decrement the timer and update the UI; stop the timer at 0
    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    // stop the timer and check the answers
    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    // hide the questions and display the end page with results
    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers: " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
        $("#unanswered").text("Skipped questions: " + numUnanswered);
    }
}

// functions to handle the building questions page and scoring
var trivia = {

    // pull questions from the array of questions, loop through them, and append to UI
    displayQuestions: function () {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for (var i = 0; i < questionBank.length; i++) {

            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];
            var answer4 = questionBank[i].answers[3];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div><br>');
        }

        // add a Done button to the end of the page and register its click handler
        var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);
    },

    // test if the user answers are correct, incorrect, or if there are unanswered questions
    checkAnswers: function () {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;

        // loop through to compare the text of the label with the user answers
        // increment score counts appropriately
        for (var i = 0; i < questionBank.length; i++) {
            correctAnswer = questionBank[i].correct;
            console.log(correctAnswer);
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }
            }
        }

        // show the end page with the score tally
        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank = [{
        question: "The acronym CSS means what?",
        answers: ['Cool Style Sheets', 'Crummy Style Sheets', 'Cascading Style Sheets', 'Colored Style Sheets'],
        correct: 'Cascading Style Sheets',
    },

    {
        question: "The acronym PHP means what?",
        answers: ['PHP: Hypertext Preprocessor', 'Personal Hypertext Preprocessor', 'PHP', 'Patronizing Hypertext Preprocessor'],
        correct: 'PHP: Hypertext Preprocessor',
    },
    {
        question: "Who was the creator of Git?",
        answers: ['Steve Jobs', 'Linus Torvalds', 'Steven Seagal', 'Tom Preston-Werner'],
        correct: 'Linus Torvalds',
    },
    {
        question: "Django is a web framework for what language?",
        answers: ['Ruby', 'JavaScript', 'PHP', 'Python'],
        correct: 'Python',
    },
    {
        question: "Which one of these is a CSS preprocessor?",
        answers: ['HTML', 'React', 'SASS', 'Lua'],
        correct: 'SASS',
    },
    {
        question: "A JavaScript catch block is written how?",
        answers: ['catch(Exception $e){}', 'catch(Exception e){}', 'except Exception as inst', 'catch(err){}'],
        correct: 'catch(err){}',
    },
    {
        question: "What is the function of CSS on a website?",
        answers: ['Markup web pages', 'Output data to a client', 'Used to describe look and format of markup', 'NOTHING'],
        correct: 'Used to describe look and format of markup',
    },
    {
        question: "What does the &#60;b&#62; tag do in HTML?",
        answers: ['Break to a new line', 'Insert server data', 'Bold Text', 'Bullet Point'],
        correct: 'Bold Text',
    },
    {
        question: "What language was GSAP originally written in?",
        answers: ['VBScript', 'ActionScript', 'Silverlight', 'JavaScript'],
        correct: 'ActionScript',
    },
    {
        question: "What type of file is a SVG file?",
        answers: ['Bitmap', 'Vector', 'Raster', 'GIF'],
        correct: 'Vector',
    }
]