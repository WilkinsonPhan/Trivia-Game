// To run this assignment, right click on index.html in the Visual Studio Code file explorer to the left
// and select "Open with Live Server"

// YOUR CODE HERE!
import { getCategories } from "./jeopardyAPIService.js"
import { hintElement, rightOrWrongElement, scoreElement, categoryContent, clueContent } from "./view.js"
import { displayClue, displayOutcome, displayScore, displayHint, newCategory } from "./displayNewCategory.js"

let data = {
    index: 0,
    currentScore: 0,
    currentCategory: "",
    currentQuestion: "",
    currentAnswer: "",
    userAnswer: "",
    categoriesArray: [],
    currentCluesArray: [],
}

getCategories()
    .then(categories => {
        data.categoriesArray = categories
        newCategory(categoryContent, clueContent, hintElement, data)
    })

const submitButton = document.querySelector(".user-form")
submitButton.addEventListener("submit", submitAnswer)

function submitAnswer(event) {
    event.preventDefault()
    const userSubmitInput = document.querySelector(".user-answer")
    data.userAnswer = userSubmitInput.value
    userSubmitInput.value = ""
    if (data.userAnswer.toLowerCase() === data.currentAnswer.toLowerCase()) {
        data.index += 1
        data.currentScore += 1
        displayOutcome(rightOrWrongElement, data)
        displayScore(scoreElement, data)
        console.log("User Anwser: ", data.userAnswer)
        console.log("Outcome: Correct")
        if (data.index < data.currentCluesArray.length) {
            data.currentQuestion = data.currentCluesArray[data.index].question
            data.currentAnswer = data.currentCluesArray[data.index].answer
            displayClue(clueContent, data.currentQuestion)
            displayHint(hintElement, data)
            console.log("Current Answer: ", data.currentAnswer)
        } else {
            data.index = 0
            displayOutcome(rightOrWrongElement, data)
            newCategory(categoryContent, clueContent, hintElement, data)
        }
    } else {
        data.index = 0
        data.currentScore = 0
        displayOutcome(rightOrWrongElement, data)
        displayScore(scoreElement, data)
        newCategory(categoryContent, clueContent, hintElement, data)
        console.log("User Anwser: ", data.userAnswer)
        console.log("Outcome: Wrong")
    }
}
