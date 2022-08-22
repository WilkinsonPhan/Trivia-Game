// Module: Functional components of the code; generate random categories and display their clues and hints;
//         display if user's answer outcome correct or wrong, and their score
import { getClues } from "./jeopardyAPIService.js"

function getRandomNumber(arrayLength) {
    return Math.round(Math.random() * (arrayLength - 1))
}

function renderInfoToPage(element, object) {
    if (object.answer === undefined) {
        element.innerHTML = `<b>Category</b>: ${object.title}`
    } else {
        displayClue(element, object.question)
        console.log("Current Answer: ", object.answer)
    }
}

// Reference: Fisher-Yates Shuffle modified from stackoverflow.com, How do I shuffle the characters in a string in JavaScript?
function scrambleAnswer(string) {
    let array = string.split("")
    for (let index = array.length - 1; index > 0; index -= 1) {
        let placeholder = array[index]
        let randomIndex = Math.floor(Math.random() * (index + 1))
        array[index] = array[randomIndex]
        array[randomIndex] = placeholder
    }
    return array.join("")
}

function hintWordCount(string) {
    if (string.includes(" ")) {
        return `${string.split(" ").length} words (or numbers)`
    } else {
        return `1 word (or number)`
    }
}

function displayClue(element, string) {
    element.innerHTML = `<b>Clue</b>: ${string}</br>`
}

function displayOutcome(element, object) {
    if (object.currentScore > 0) {
        element.style.display = "block"
        element.innerHTML = `</br><span class="correct"><b>Correct</b></span>, your Score is now <b>${object.currentScore}</b>! Please, continue playing!`
        setTimeout(() => { element.style.display = "none" }, 2250)
    } else {
        element.style.display = "block"
        element.innerHTML = `</br><span class="wrong"><b>Wrong</b></span>, your Score is now <b>${object.currentScore}</b>! Please, start again!</br>
                            </br><em>Correct Answer</em>: <b>${object.currentAnswer}</b>
                            </br>User Answer: ${object.userAnswer}
                            `
        setTimeout(() => { element.style.display = "none" }, 4000)
    }
}

function displayScore(element, object) {
    element.innerHTML = `<b>Score</b>: ${object.currentScore}</br>`
}

function displayHint(element, object) {
    element.innerHTML = `<b>Hint</b>: ${hintWordCount(object.currentAnswer)}, ${scrambleAnswer(object.currentAnswer)}`
}

function newCategory(element1, element2, element3, object) {
    object.currentCategory = object.categoriesArray[getRandomNumber(object.categoriesArray.length)]
    getClues(object.currentCategory.id)
        .then(clues => {
            object.currentCluesArray = clues
            object.currentQuestion = object.currentCluesArray[object.index].question
            object.currentAnswer = object.currentCluesArray[object.index].answer

            renderInfoToPage(element1, object.currentCategory)
            renderInfoToPage(element2, object.currentCluesArray[object.index])
            displayHint(element3, object)
        })
}

export { displayClue, displayOutcome, displayScore, displayHint, newCategory }