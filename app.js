const myQuestions = [
    {
        question: "All these are consequences of drug abuse EXCEPT ___",
        answers: {
            a: 'drug trafficking',
            b: 'long life',
            c: 'misconduct',
            d: 'premature death'
        },
        correctAnswer: 'a',
    },
    {
        question: "One of this is a common crime found in schools",
        answers: {
            a: 'bullying',
            b: 'fraud',
            c: 'murder',
            d: 'rape'
        },
        correctAnswer: 'a',
    },
    {
        question: "The appropriate authority that can help in the prevention of drug abuse is",
        answers: {
            a: 'NNPC',
            b: 'NAFDAC',
            c: 'NDLEA',
            d: 'police'
        },
        correctAnswer: 'b',
    },
    {
        question: "Examination malpractice is a form of ___",
        answers: {
            a: 'civic right',
            b: 'dishonesty',
            c: 'self-reliance',
            d: 'value'
        },
        correctAnswer: 'b',
    },
    {
        question: "The punishment for murder is ___",
        answers: {
            a: 'fine',
            b: 'restitution',
            c: 'suspension',
            d: 'death'
        },
        correctAnswer: 'd',
    }
];

const resCont = document.querySelector('.result');
const quizCont = document.querySelector('.quiz-container');
const submit = document.querySelector('.submit');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const progress = document.querySelector('.progress-indicator');

buildQuiz = () => {
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        // an array to hold our answers
        const answers = [];
  
        // iterating through each answer
        for(letter in currentQuestion.answers){
  
          // dynamically adding a radio button
          answers.push(
            `
            <div class="option">
                <input type="radio" value="${letter}" name="question${questionNumber}" class="ans-option">
                <label for="question${questionNumber}" class="label">${letter} : ${currentQuestion.answers[letter]}</label>
            </div>
            `
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `
          <div class="slide">
              <div class="question"> <h3>${currentQuestion.question}</h3></div>
              <div class="answers"> ${answers.join('')} </div>
          </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizCont.innerHTML = output.join('');
}

let currQues = 1;
progIndicator = (n) =>{
    const quesArray = Array.from(myQuestions);

    progIndic = [];
    currQues = n;

    progIndic.push(
        `
        <progress min="0" max="${quesArray.length}" value="${n}"></progress> <br>
        <label for="progress-number">
            <span class="progress-number"> Question ${n} / ${quesArray.length}</span>
        </label>
        `
    )
    progress.innerHTML = progIndic.join('');

}
// progIndicator();

showResult = () =>{
    let numCorrect = 0;
    const answers = quizCont.querySelectorAll('.answers');
    myQuestions.forEach((currentQuestion, questionNumber) =>{
        const ansCont = answers[questionNumber];
        const selector = `input[name = question${questionNumber}]:checked`;
        const userAnswer = (ansCont.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer){
            numCorrect++;
        }
    })
    let dispRes = resCont;

    resCont.innerHTML = `<h3>You scored ${numCorrect} out of ${myQuestions.length}</h3>`;
    userAnswer = '';
    return dispRes;
};

buildQuiz();

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
showSlide = (n) =>{
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        prev.style.display = 'none';
    } else {
        prev.style.display = 'inline-block';
    }

    if(currentSlide === slides.length-1){
        next.style.display = 'none';
        submit.style.display = 'inline-block';
    } else {
        next.style.display = 'inline-block';
        submit.style.display = 'none';
    }
}


showNextSlide = () => {
    showSlide(currentSlide + 1);
    // progIndicator(currQues + 1);
}
showPrevSlide = () => {
    showSlide(currentSlide - 1);
    // progIndicator(currQues - 1);
}

// next.addEventListener('click' , showNextSlide);
next.addEventListener('click' , () =>{
    showNextSlide();
    progIndicator(currQues + 1);

});
submit.addEventListener("click" , showResult);
prev.addEventListener('click' , () =>{
    showPrevSlide();
    progIndicator(currQues - 1);
});
showSlide(0);