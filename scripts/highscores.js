const highScoresList = document.getElementById("highScoresList");
const listCategory = document.getElementById("listCategory");
const category = document.querySelector("select").value;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// console.log(category);

listCategory.innerHTML = `<option value="Select" selected="selected">Select Category</option>` + highScores
    .map(score => {
        return `<option value="${score.category}">${score.category}</option>`;
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