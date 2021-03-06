const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let newQuestions = [];

let categoryHome = document.querySelector('#categories');
let categoryMain = document.querySelector('.categoryMain');

let availableCategories = [];

let questions = [];

fetch(
        'https://opentdb.com/api.php?amount=50'
    )
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions.results.map((loadedQuestion) => {

            const category = {
                category: loadedQuestion.category,
            };;

            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.category = loadedQuestion.category;

            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });

        selectCategory();

    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;


selectCategory = () => {
    getCategories();

    availableCategories.forEach((category) => {
        let categoryBody = document.createElement('a');
        categoryBody.classList.add('btn');
        categoryBody.textContent = category;
        // categoryBody.setAttribute('href', '/game.html');
        categoryBody.addEventListener('click', () => {
            localStorage.setItem('tempCategory', category);
            startGame();
        });
        categoryHome.append(categoryBody);
    });
    categoryHome.classList.remove('hidden');
    loader.classList.add('hidden');
};

getCategories = () => {
    availableCategories = [...questions].map(question => question.category).filter(onlyUniqueCategory);
};



function onlyUniqueCategory(value, index, self) {
    return self.indexOf(value) === index;
}




startGame = () => {
    categoryMain.classList.add('hidden');
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');

};

function onlyUnique(value, index, self) {
    return self.indexOf(value) !== undefined;
}

getNewQuestion = () => {
    let tempCategory = localStorage.getItem('tempCategory');
    newQuestions = availableQuesions.filter((question) => question.category === tempCategory);

    if (newQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }


    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * newQuestions.length);
    currentQuestion = newQuestions[questionIndex];

    // console.log(currentQuestion);
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });

    acceptingAnswers = true;
    console.log(newQuestions);
    newQuestions.splice(questionIndex, 1);
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};