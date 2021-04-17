const highScoresList = document.getElementById("highScoresList");
const listCategory = document.getElementById("listCategory");
const category = document.querySelector("select").value;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores[0].category);

categoriesHighScores = highScores.map(score => score.category).filter(onlyUniqueCategory);

// console.log(category);

listCategory.innerHTML = `<option value="Select" selected="selected">Select Category</option>` +
    categoriesHighScores.map(category => {
        return `<option value="${category}">${category}</option>`;
    })
    .join("");

function selector() {
    var result = document.querySelector("select").value;

    highScoresList.innerHTML = highScores
        .map(score => {
            if (score.category === result) {
                return `<li class="high-score">${score.name} - ${score.score}</li>`;
            } else {
                return '';
            }
        })
        .join("");
}


function onlyUniqueCategory(value, index, self) {
    return self.indexOf(value) === index;
}