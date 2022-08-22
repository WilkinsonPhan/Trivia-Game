// Module: Accessing Categories and Clues from Jeopardy API 
const baseURL = "https://jservice.kenzie.academy"

async function getCategories() {
    const endpoint = "/api/categories"
    const url = baseURL + endpoint

    const response = await fetch(url)
    const data = await response.json()
    return data.categories
}

async function getClues(id) {
    const endpoint = "/api/clues?category="
    const url = baseURL + endpoint + id

    const response = await fetch(url)
    const data = await response.json()
    return data.clues
}

export { getCategories, getClues }