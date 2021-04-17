let categoryHome = document.querySelector('#categories');
let availableCategories = [];


let questions = [];

getCategories = () => {
    if (availableCategories.length === 0) {
        //go to the end page
        return window.location.assign('/end.html');
    }

};



fetch(
        'https://opentdb.com/api.php?amount=50'
    )
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        // console.log(loadedQuestions);
        questions = loadedQuestions.results.map((loadedQuestion) => {

            const category = {
                category: loadedQuestion.category,
            };;
            // console.log(category);
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            // console.log(formattedQuestion);

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

            // console.log(formattedQuestion);
            return formattedQuestion;
        });

        selectCategory();

    })
    .catch((err) => {
        console.error(err);
    });


selectCategory = () => {
    getCategories();
    availableCategories.forEach((category) => {
        let categoryBody = document.createElement('a');
        categoryBody.classList.add('btn');
        categoryBody.textContent = category;
        categoryBody.setAttribute('href', '/game.html');
        categoryBody.addEventListener('click', () => localStorage.setItem('tempCategory', category));
        categoryHome.append(categoryBody);
    });
    categoryHome.classList.remove('hidden');
    loader.classList.add('hidden');
};

getCategories = () => {
    availableCategories = [...questions].map(question => question.category).filter(onlyUnique);
    // console.log(questions);
};

categoryHandler = () => {

    // console.log(questions);
};


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}