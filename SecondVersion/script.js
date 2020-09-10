var highScoreEl = document.getElementById("high-score");
var currentScoreEl = document.getElementById("current-score");
var timerEl = document.getElementById("timer");
var answerOne = document.getElementById("answer-one");
var answerTwo = document.getElementById("answer-two");
var answerThree = document.getElementById("answer-three");
var answerFour = document.getElementById("answer-four");
var startButton = document.getElementById("start-btn");
var resetButton = document.getElementById("reset-btn");

let currentQuestionIndex;

// add event listeners for all of the answers
startButton.addEventListener("click", startQuiz);
answerOne.addEventListener("click", )
answerTwo.addEventListener("click", )
answerThree.addEventListener("click", )
answerFour.addEventListener("click", )
resetButton.addEventListener("click", )


function startQuiz() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    answerOne.classList.remove("hide");
    answerTwo.classList.remove("hide");
    answerThree.classList.remove("hide");
    answerFour.classList.remove("hide");
    setNextQuestion(); // a function to set the questions in the place of the placeholders
    setTime(); // set the timer running.
}


function setTime() {
  
  timerEl.setAttribute("id", "timer-readout");
  document.body.appendChild(timer);

  timer.innerHTML = "BEGIN!";
  myInterval = setInterval(() => {
    gameDurationInSec--;

    let minuteHand = Math.floor(gameDurationInSec / 60);
    let secondHand = gameDurationInSec % 60;
    if (secondHand < 10) {
      secondHand = "0" + secondHand;
    }

    timer.innerHTML = `${minuteHand}:${secondHand}`;
  
    if (gameDurationInSec <= 0) {
      gameOver();
    }
  }, 1000);
}



function setNextQuestion()
  resetState()
  showQuestion(questions[currentQuestionIndex]);

function showQuestion(question){
  questionElement.innerText = question.title;
  for(i = 0; i <questions.answers.length; i++ ){}

}

function resetState(){
  clearStatusClass(document.body)
}


const questions = [
    {
        title: "Commonly used data types DO NOT include:", // key
        answers: [ // value, array
            {text: "strings", correct: false}, //objects
            {text: "booleans", correct: false},
            {text: "alerts", correct: true},
            {text: "numbers", correct: false}
        ]
    },
    {
        title: 'The condition in an if/else statement is enclosed within____.',
        answers: [
          { text: 'quotes', correct: false },
          { text: 'curly brackets', correct: false},
          { text: 'parentheses', correct: true },
          { text: 'square brackets', correct: false }
        ]
      },
      {
        title: 'Arrays in JavaScript can be used to store _____. ',
        answers: [
          { text: 'numbers and strings', correct: false },
          { text: 'other arrays', correct: false },
          { text: 'booleans', correct: false },
          { text: 'All of the above!', correct: true }
        ]
      },
      {
        title: 'String values must be enclosed within _____ when being assigned to variables.',
        answers: [
          { text: 'commas', correct: false },
          { text: 'curly brackets', correct: false},
          { text: 'quotes', correct: true },
          { text: 'parentheses', correct: false }
        ]
      },
      {
      title: 'A very useful tool used to during development and debugging for printing content to the debugger is:',
        answers: [
          { text: 'JavaScript', correct: false },
          { text: 'terminal/bash', correct: false},
          { text: 'for loops', correct: false },
          { text: 'console.log()', correct: true}
        ]
      }
]