const fs = require("fs");
const path = require("path");
const readline = require("node:readline");
const process = require("node:process")

const filePath = "./newsDatabase.json";

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Load the sports news from the JSON file
function loadNews() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading the JSON file:", err);
    return [];
  }
}

// Save the updated news to the JSON file
function saveNews(news) {
  fs.writeFileSync(filePath, JSON.stringify(news, null, 2), "utf8");
}

// Display the news articles. If there are no news articles available, display a message saying "No news articles available."
// The news articles should be displayed in the following format:
// Current Sports News:
// ID: 1 - Title of the news article
// ID: 2 - Title of the news article
function displayNews() {
  try{
    let result = ""
    const data = fs.readFileSync(filePath, "utf8")
    const objnews = JSON.parse(data)
    for (let i = 0; i < objnews.length; i++) {
      result += "ID: " + objnews[i].id + " - " + objnews[i].title + "\n";
    }
    
    console.log(result)
    rl.close()
  }
  catch(err){
    console.error("No news articles available", err);
    return[];
  }
}

// Display the content of a news article with the specified ID. If a news article with the specified ID is not found, display a message saying "No article found with that ID."
// The content of the news article should be displayed in the following format:
// Title: Title of the news article
// Content: Content of the news article
function displayNewsById() {
  try{
  const data = fs.readFileSync(filePath, "utf8");
  const objnews = JSON.parse(data);
  
  rl.question("What news do you want to see?", (id) => {
    const id1 = parseInt(id)
    if (objnews[id1]) {
      console.log("Title: " + objnews[id1].title + "\n" + "Content: " + objnews[id1].content);
    } else {
      console.error("No article found with that id!");
    }
    rl.close()
  })
  
}
  catch(err){
    console.error("No article find with that id", err);
    return[];
  }

}
// Add a new news article to the list of news articles. The user should be prompted to enter the title and content of the news article.
// The new article should have an ID that is one greater than the ID of the last article in the list.
// After adding the news article, save the updated list of news articles to the JSON file and display a message saying "News article added."
function addNews() {
  const data = fs.readFileSync(filePath, "utf8");
  const objnews = JSON.parse(data);
  rl.question("What title of your news?", (title1) => {
  rl.question("What content of your news?", (content1) => {
  const newObject = {
    "id": objnews.length + 1,
    "title": title1,
    "content": content1
  };
  objnews.push(newObject)
  saveNews(objnews);
  console.log("News article added.");
  
  rl.close();
});
  });
}

// Remove a news article from the list of news articles. The user should be prompted to enter the ID of the news article to remove.
// If the news article with the specified ID is found, remove it from the list of news articles.
// After removing the news article, save the updated list of news articles to the JSON file and display a message saying "News article removed."
// If no news article is found with the specified ID, display a message saying "No article found with that ID."
function removeNews() {

}

// Prompt the user for an action to perform. The user should be able to view the news articles, add a new news article, remove a news article, or exit the application.
// After performing the selected action, the user should be prompted again for the next action to perform.
// The application should continue running until the user chooses to exit.
function promptUser() {}

// Start the application
function startApp() {}

removeNews()
console.log()