// Module: Accessing and Creating HTML elements to display on webpage
const pElement = document.querySelector("p")
const mainElement = document.querySelector("main")
const hintElement = document.querySelector(".hint-div")

const rightOrWrongElement = document.createElement("div")
const scoreElement = document.createElement("div")
const categoryBox = document.createElement("div")
const categoryContent = document.createElement("div")
const clueBox = document.createElement("div")
const clueContent = document.createElement("div")

rightOrWrongElement.style.display = "none"
rightOrWrongElement.innerHTML = ""

scoreElement.setAttribute("class", "user-score")
scoreElement.innerHTML = `<b>Score</b>: 0</br>`

categoryBox.setAttribute("class", "category-box")
categoryContent.setAttribute("class", "category-content")
categoryContent.innerHTML = ""

clueBox.setAttribute("class", "clue-box")
clueContent.setAttribute("class", "clue-content")
clueContent.innerHTML = ""

pElement.append(rightOrWrongElement)
categoryBox.append(categoryContent)
clueBox.append(clueContent)
mainElement.append(scoreElement, categoryBox, clueBox)

export { hintElement, rightOrWrongElement, scoreElement, categoryContent, clueContent }