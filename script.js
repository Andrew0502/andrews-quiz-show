// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Commonly used data types DO Not include:",
        choiceA : "stings",
        choiceB : "booleans",
        choiceC : "alerts",
        choiceD : "numbers",
        correct : "C"
    },{
        question : "The condition in an if/else statement is enclosed within____.",
        choiceA : "quotes",
        choiceB : "curly brackets",
        choiceC : "parentheses",
        choiceD : "square brackets",
        correct : "C"
    },{
        question : "Arrays in JavaScript can be used to store _____.",
        choiceA : "numbers and strings",
        choiceB : "ALL of the above",
        choiceC : "booleans",
        choiceD : "other arrays",
        correct : "B"
    },{
        question : "String values must be enclosed within _____ when being assigned to variables.",
        choiceA : "quotes",
        choiceB : "curly brackets",
        choiceC : "commas",
        choiceD : "parentheses",
        correct : "A"
    },{
        question : "A very useful tool used to during development and debugging for printing content to the debugger is:",
        choiceA : "JavaScript",
        choiceB : "terminal/bash",
        choiceC : "for loops",
        choiceD : "console.log()",
        correct : "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    var resultsArray;
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";

    //prompt
    var userName = prompt("Game Over! please enter your name: ");
    var storedScores = localStorage.getItem("resultsString");
    if(storedScores === null){
        resultsArray = [];
    } else {
        resultsArray = JSON.parse(storedScores);
    }
    var gameResult = { 
        player: userName,
        score: scorePerCent
    };

    resultsArray.push(gameResult);
    localStorage.setItem("resultsString", JSON.stringify(resultsArray));
    for(i = 0; i < resultsArray.length; i++){
        var nameField = document.createElement("p");
        nameField.textContent = resultsArray[i].player;
        container.appendChild(nameField);

        var scoreField = document.createElement("p");
        scoreField.textContent = resultsArray[i].score;
        container.appendChild(scoreField);
    }
}
