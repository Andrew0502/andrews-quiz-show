const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById ("question-container");
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById("answer-buttons");
const timerEl = document.getElementById("timer");


let currentQuestionIndex;



startButton.addEventListener("click", startGame);
// nextButton.addEventListener("click", () => {
//     currentQuestionIndex++
//     setNextQuestion();
// })



function startGame() {
    // console.log("started");
    startButton.classList.add("hide"); // adds CSS class to start button. the CSS class makes it disappear.
    currentQuestionIndex = 0; //
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    setTime();


    
}
function setNextQuestion() {
    resetState(); // emptying out the previous question choices, 
    showQuestion(questions[currentQuestionIndex]); // activate the showQuestions function, with the questions object, at the next question index.



}

// display next q title and  make btns for answer choices
function showQuestion(question){
    questionElement.innerText = question.title;  //.innerText means you are changing the text inside the tags of the question Element. 
    //question.title = the title line of the array index is the object you pass into the function.
    question.answers.forEach(function(answer) { //answers refer to the answers objects of the questions array. .forEach is like a for loop. for each answer in this array.
       const button = document.createElement('button'); // creating button tags for answers.
       button.innerText = answer.text; // making the text on the button the text of the answer object we are currently looped on. adding text to the answer buttons.
       button.classList.add('btn'); // added button class (styles) to the button class we added above.
       if(answer.correct) { //checking if you clicked on the answers object that is correct in the answers .
           button.correct = answer.correct; //
       }
       button.addEventListener('click', selectAnswer); //
       answerButtonsElement.appendChild(button); // putting the buttons in the correct div. (after getting rid of the placeholders and then clicking start)
    } );
}



function resetState(){
    clearStatusClass(document.body); // puts the correct or wrong states to the body.
    nextButton.classList.add('hide'); // hide next button.
    while(answerButtonsElement.firstChild){ // while the answer buttons has children, in this case it means that while there are answer buttons on screen, remove the answer buttons.
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}



function selectAnswer(e){
    const selectedButton = e.target; // Selected button is the button we clicked on.
    const isCorrect = selectedButton.correct; // variable recording if the button we selected is correct or not.
    setStatusClass(document.body, isCorrect); // refers to the class that changes between red and green.
    Array.from(answerButtonsElement.children).forEach(function(button) { // takes the answersButtonElement.children, an iterable object, and turn it to a array. 
        setStatusClass(button, button.correct); // Activates the seStatusClass function and sends the button that was selected and the parameter checking if it is correct.
    })
    if (questions.length > currentQuestionIndex + 1){ //If the total length of the questions array is greater than the question index + 1 do the operation to move to the next question.
    //    nextButton.classList.remove('hide');  //unhide the next button.
            // For( i = 0; questions.length; i++)
            currentQuestionIndex++ // increase the number of the current question index but 1.
            setNextQuestion(); // Activate the setNextQuestion function. 
    } else { // if the currentQuestionIndex number is greater than or equal to the total length of the array then do this to restart the quiz.
        startButton.innerText = 'Restart'; // changed the start button to the reset button.
        startButton.classList.remove('hide'); // unhide the start button
    }
    
}



function setStatusClass(element, isCorrect){  //The function that determines if the answer is correct or false.
    clearStatusClass(element)
    if(isCorrect){
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) { //resets the background and buttons when you move to the next question.
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


function setTime() {
    var timeLeft = 100;
  
    var timeInterval = setInterval(function() {
      timerEl.textContent = timeLeft + " seconds remaining";
      timeLeft--;
  
      if (timeLeft === 0) {
        timerEl.textContent = "";
        
        clearInterval(timeInterval);
      }
  
    }, 1000);
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