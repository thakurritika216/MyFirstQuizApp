const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Are you ready friends for this quiz?',
    answers: [
      { text: 'A. Yes', correct: true },
      { text: 'B. NO', correct: false }
      
    ] 
  
  },
  {
    question: 'Given the session PageB> PageA> PageD> PageC> Exit, which Page got the exit?',
    answers: [
      { text: 'PageA', correct: false },
      { text: 'PageB', correct: false },
      { text: 'PageC', correct: true },
      { text: 'PageD', correct: false }
    ]
  },
  {
    question: 'How do we define an Active user in Real Time reports?',
    answers: [
      { text: 'User who has not triggered any event or page view in last 30 minutes', correct: false },
      { text: 'User who triggerd an event or page view in last 30 minutes ', correct: true },
      { text: 'User who has triggerd an event or page view in last 5 minutes', correct: false },
      { text: 'User who have website open on their device', correct: false }
    ]
  },
  {
    question: 'What format is used to import data in GA?',
    answers: [
      { text: 'SQL', correct: false },
      { text: 'Excel', correct: false },
      { text: 'CSV', correct: true },
      { text: 'TAB', correct: false }
    ]
  },
  {
    question: 'Which of these is not a predefined type of goal in Google Analytics?',
    answers: [
      { text: 'Number of transactions/visit', correct: true },
      { text: 'Pages/visit', correct: false },
      { text: 'Destination', correct: false },
      { text: 'Event', correct: false }
    ]
  },
  {
  question: 'If you want to look at the search query used to get the visitors on your site, you would look into?',
  answers: [
    { text: 'Advertising Report', correct: false },
    { text: 'Behavior Report', correct: false },
    { text: 'Acquisition Report', correct: true },
    { text: 'Audience Reports', correct: false }
  ]
},
  {
    question: 'What is default session time for Google Analytics? Can this be changed?',
    answers: [
      { text: '30 min/Yes', correct: true },
      { text: '45 min/Yes', correct: false },
      { text: '30 min/No', correct: false },
      { text: '45 min/No', correct: false }
    ]
  }
  
]
