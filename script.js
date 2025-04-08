// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    {
      question: "What is the capital of Jamaica?",
      answers: [
        { text: "Queenstown", correct: false },
        { text: "Kingstown", correct: false },
        { text: "Kingston", correct: true },
        { text: "Kingsville", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // Each div and/or element in an html have a field for an id so you can uniquely reference them. Once an id is used once, it cannot
  // used again. Thus, for usages like "document.getElementById", you can get the value that is associated with that id
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");

  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // These variables will be different based on the current question that is being answered. In our case, the answers and infromation associated 
      // with the questions are different, thus you need these to be assigned dynamically based on the question being answered. Additionally, each 
      // question can have a different amount of answers
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // This makes the next button appear below the question when the user provides an answer
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "block";
    hintButton.disabled = false;
    answerButtonsElement.innerHTML = "";
  }
  
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Originally the display is set to none, so here you are changing the display so the next button actually shows up 
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
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
  
  // 6. Summarize in your own words what you think this block of code is doing. 
  // The below code is providing logic for the "next button". Essentially, it is checking if we have more question by checking the our current question "index"
  // with the total length of the questions array. If we have not reached the end of the array, i.e. we have more questions, then we will go to the next question
  // by leveraging the handleNextButton() method. Otherwise, we are at the end of the array meaning we have no more questions left so we restart the quiz by using
  // the startQuiz() method
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  hintButton.addEventListener("click", () => {
    const buttons = Array.from(answerButtonsElement.children);
    const wrongButtons = buttons.filter(btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong"));
    
    if (wrongButtons.length > 0) {
      const randomWrong = wrongButtons[Math.floor(Math.random() * wrongButtons.length)];
      randomWrong.classList.add("wrong");
      randomWrong.disabled = true;
      hintButton.disabled = true;
    }
  });
  
  
  startQuiz();
  