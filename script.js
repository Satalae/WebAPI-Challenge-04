// Document Elements
var scoreButton = document.querySelector(".score-button");
var startButton = document.querySelector(".start-button");
var returnButtons = document.querySelectorAll(".return-button");
var submitButton = document.querySelector(".submit-button");
var resetButton = document.querySelector(".reset-button");
var intro = document.querySelector(".intro");
var quiz = document.querySelector(".quiz");
var question = document.querySelector(".question");
var score = document.querySelector(".score-screen");
var scoreBoard = document.querySelector(".score-board");
var scoreList = document.querySelector(".high-scores");
var timerScreen = document.querySelector(".timer-block");
var nameInput = document.querySelector("#name");
var button1 = document.querySelector(".button1");
var button2 = document.querySelector(".button2");
var button3 = document.querySelector(".button3");
var button4 = document.querySelector(".button4");
var finalScore = document.querySelector(".score");

// Global Variables
var timer;
var timerCount;
var questionStep;
var scores = [];

// Question/Answers Arrays
var questions = ['Arrays in Javascript can be used to store _____', 
'Commonly used data types DO NOT include: ',
'The conditional inside an if/else statement is enclosed with a _____',
'String values must be enclosed with _____ before being stored as a variable.',
'A very useful tool during development that is used to print given content inside the console: '];

var answers1 = ['Letters and Strings', 'Numbers', 'Booleans', 'All of the above'];
var answers2 = ['Strings', 'Booleans', 'Events', 'Numbers'];
var answers3 = ['Quotes', 'Curly Brackets', 'Parentheses', 'Square Brackets'];
var answers4 = ['Commas', 'Parentheses', 'Quotes', 'Curly Brackets'];
var answers5 = ['Console Log', 'Terminal / Bash', 'Javascript', 'For Loops'];

// Home Screen
function startGame() {
    console.log('Start Button Registered');
    timerCount = 90;
    questionStep = 0;

    //Hides and disables the intro/button
    intro.hidden = true;
    scoreButton.hidden = true;
    quiz.hidden = false;

    // Render quizScreen and start timer
    renderQuestion();
    startTimer();
}

function showScore() {
    intro.hidden = true;
    scoreButton.hidden = true;
    scoreBoard.hidden = false;


    //Appends each item from the score
    for(var i = 0; i < scores.length; i++){
        var score = scores[i];

        var li = document.createElement('li');
        li.textContent = score;
        li.setAttribute("data-index", i);

        scoreList.appendChild(li);
    }
}

// Quiz Screen
function renderQuestion() {
    question.textContent = questions[questionStep];

    switch(questionStep){
        case 0:
            button1.textContent = answers1[0];
            button2.textContent = answers1[1];
            button3.textContent = answers1[2];
            button4.textContent = answers1[3];
            break;
        case 1:
            button1.textContent = answers2[0];
            button2.textContent = answers2[1];
            button3.textContent = answers2[2];
            button4.textContent = answers2[3];
            break;
        case 2:
            button1.textContent = answers3[0];
            button2.textContent = answers3[1];
            button3.textContent = answers3[2];
            button4.textContent = answers3[3];
            break;
        case 3:
            button1.textContent = answers4[0];
            button2.textContent = answers4[1];
            button3.textContent = answers4[2];
            button4.textContent = answers4[3];
            break;
        case 4: 
            button1.textContent = answers5[0];
            button2.textContent = answers5[1];
            button3.textContent = answers5[2];
            button4.textContent = answers5[3];
            break;
    };

    questionStep++;
}

function startTimer() {
    timerScreen.textContent = timerCount;

    timer = setInterval(function() {
        timerScreen.textContent = timerCount;
        timerCount--;
        timerScreen.textContent = timerCount;

        if(questionStep === 5){
            finalScore.textContent = timerCount;
            clearInterval(timer);
        }
        if(timerCount === 0){
            finalScore.textContent = timerCount;
            clearInterval(timer);
        }
    }, 1000);
}

function handleButton() {
    currentAnswer = this.textContent;

    switch(questionStep){
        case 1:
            if(currentAnswer == 'All of the above'){
                console.log('Correct!');
            }else{
                if(timerCount > 10){
                    timerCount = timerCount - 10;
                }else if(timerCount <= 10){
                    timerCount = 0;
                }
                console.log('Incorrect.');
            }
            break;
        case 2:
            if(currentAnswer == 'Events'){
                console.log('Correct!');
            }else{
                if(timerCount > 10){
                    timerCount = timerCount - 10;
                }else if(timerCount <= 10){
                    timerCount = 0;
                }
            }
            break;
        case 3:
            if(currentAnswer == 'Parentheses'){
                console.log('Correct!');
            }
            else{
                if(timerCount > 10){
                    timerCount = timerCount - 10;
                }else if(timerCount <= 10){
                    timerCount = 0;
                }
            }
            break;
        case 4:
            if(currentAnswer == 'Quotes'){
                console.log('Correct!');
            }else{
                if(timerCount > 10){
                    timerCount = timerCount - 10;
                }else if(timerCount <= 10){
                    timerCount = 0;
                }
            }
            break;
        case 5:
            if(currentAnswer == 'Console Log'){
                console.log('Correct!');
            }else{
                if(timerCount > 10){
                    timerCount = timerCount - 10;
                }else if(timerCount <= 10){
                    timerCount = 0;
                }
            }
            break;
    }

    if(questionStep < 5){
        renderQuestion();
    }else{
        renderScore();
    }
}

// Score Screen
function renderScore() {
    quiz.hidden = true;
    score.hidden = false;
}

function submitScore(event) {
    event.preventDefault();

    newScore = nameInput.value.trim();
    newScore = newScore + " scored: " + timerCount

    scores.push(newScore);
    nameInput.value = "";

    localStorage.setItem("stored-scores", JSON.stringify(newScore));
    score.hidden = true;
    scoreBoard.hidden = false;

    showScore();
}

// Initializing Function
// Pulls stored scores for usage
function init() {
    var storedScores = JSON.parse(localStorage.getItem("stored-scores"));

    if(storedScores !== null){
        scores = storedScores;
    }
}

// Event Listeners
startButton.addEventListener('click', startGame);
scoreButton.addEventListener('click', showScore);
for(let i = 0; i < returnButtons.length; i++){
    returnButtons[i].addEventListener('click', function(){
        scoreBoard.hidden = true;
        score.hidden = true;
        intro.hidden = false;
        scoreButton.hidden = false;
    });
};
submitButton.addEventListener('click', submitScore);
resetButton.addEventListener('click', function(){
    scores = [];
    localStorage.setItem("stored-scores", JSON.stringify(scores));
    while( scoreList.firstChild ){
        scoreList.removeChild(scoreList.firstChild);
    };
});
button1.addEventListener('click', handleButton);
button2.addEventListener('click', handleButton);
button3.addEventListener('click', handleButton);
button4.addEventListener('click', handleButton);

// Calls init to get data for usage
init();