const questions = [
  {
    question:
      "Who holds the record for the highest individual score in a Test inning as of 2022?",
    answers: [
      { text: "Matthew Hayden", correct: false },
      { text: "Brian Lara", correct: true },
      { text: "Virender Sehwag", correct: false },
      { text: "D. Kumar Sangakkara", correct: false },
    ],
  },
  {
    question:
      "Which bowler has taken the most wickets in a single edition of the ICC Cricket World Cup?",
    answers: [
      { text: "Glenn McGrath", correct: true },
      { text: "Muttiah Muralitharan", correct: false },
      { text: "Wasim Akram", correct: false },
      { text: "Shane Warne", correct: false },
    ],
  },
  {
    question:
      "In One Day Internationals (ODIs), who holds the record for the highest individual score by a batsman?",
    answers: [
      { text: "Chris Gayle ", correct: false },
      { text: "Virender Sehwag", correct: false },
      { text: "Martin Guptill", correct: false },
      { text: "Rohit Sharma", correct: true },
    ],
  },
  {
    question:
      "Which team has won the most number of ICC World Twenty20 (T20) championships as of 2022?",
    answers: [
      { text: "India", correct: false },
      { text: "Austrlia", correct: false },
      { text: "West Indies", correct: true },
      { text: "England", correct: false },
    ],
  },
  {
    question:
      "Who is the only cricketer to score 10,000 runs and take 500 wickets in international cricket?",
    answers: [
      { text: "Kapil Dev", correct: false },
      { text: "Shane Watson", correct: false },
      { text: "Jacques Kallis", correct: true },
      { text: "Imran Khan", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disable = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
