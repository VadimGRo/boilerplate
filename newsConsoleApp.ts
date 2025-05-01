const fs = require("fs");
const path = require("path");
const readline = require("node:readline");
const process = require("node:process");
import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';

const filePath = "./newsDatabase.json";

interface News {
  "id": string;
  "title": string;
  "content": string;
  "author": string;
  "category": string;
  "date": string;
}

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
function continueing(){
  inquirer 
    .prompt([
      {
        type: 'list',
        name: 'continueing',
        message: 'What do you want to do next?',
        choices: ['Back to menu', 'Exit']
      }
    ])
    .then((answers:any) => {
      if (answers.continueing === 'Back to menu'){
        promptUser()
      }
      else{
        console.log("Bye")
        process.exit(0);
      }
    }
    )
    

}

// Save the updated news to the JSON file
function saveNews(news: News[]): void {
  fs.writeFileSync(filePath, JSON.stringify(news, null, 2), "utf8");
}

// Display the news articles. If there are no news articles available, display a message saying "No news articles available."
// The news articles should be displayed in the following format:
// Current Sports News:
// ID: 1 - Title of the news article
// ID: 2 - Title of the news article
function displayNews(): void {
    let result: string = "";
    
    const objnews = loadNews()
    for (let i = 0; i < objnews.length; i++) {
      result += "ID: " + objnews[i].id + " - " + objnews[i].title + "\n";
    }
    
    console.log(result)
    continueing()
 

}

// Display the content of a news article with the specified ID. If a news article with the specified ID is not found, display a message saying "No article found with that ID."
// The content of the news article should be displayed in the following format:
// Title: Title of the news article
// Content: Content of the news article

function displayNewsById(): void {
 
  
  const objnews = loadNews()
  inquirer
    .prompt([
      {
      type: 'input',
      name: 'newsbyid',
      message: 'What news do you want to see?',
      validate: (value: string) => (!isNaN(Number(value)) ? true : "Enter number"),
    } 
    ])
    .then((answers) => {
      const newsId = parseInt(answers.newsbyid, 10);
      const news = objnews.find((n: any) => n.id === newsId);

    if (news) {
      console.log("Title: " + news.title + "\n" + "Content: " + news.content);
    } else {
      console.error("No article found with that id!");
    }
    })


}



// Add a new news article to the list of news articles. The user should be prompted to enter the title and content of the news article.
// The new article should have an ID that is one greater than the ID of the last article in the list.
// After adding the news article, save the updated list of news articles to the JSON file and display a message saying "News article added."
function addNews() {
  const id = uuidv4();
  const objnews = loadNews()
  const now = new Date();
  const date1 = now.getDate()
  const month = now.toLocaleString('en-US', { month: 'long' });
  const year = now.getFullYear()
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'author',
        message: "Whats your name?"
      },
      {
        type: "list",
        name: "category",
        message: "What category of your news?",
        choices: ["Football", "Basketball", "Technical", "Athletics"]
      },
      {
        type: "input", 
        name: "title", 
        message: "What title of your news?" 
      },
      { 
        type: "input", 
        name: "content", 
        message: "What content of your news?" 
      },
      

    ])
    .then((answers) => {
      const newNews: News = {
        "id": id,
        "author": answers.author,
        "category": answers.category,
        "date": " " + date1 + " " + month + " " + year,
        "title": answers.title,
        "content": answers.content,
    }
    objnews.push(newNews);
      saveNews(objnews);
      console.log("News article added.");
      continueing()
})
    
}

// Remove a news article from the list of news articles. The user should be prompted to enter the ID of the news article to remove.
// If the news article with the specified ID is found, remove it from the list of news articles.
// After removing the news article, save the updated list of news articles to the JSON file and display a message saying "News article removed."
// If no news article is found with the specified ID, display a message saying "No article found with that ID."
function removeNews() {
  
  const objnews = loadNews()
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'idofnews',
        message: "What news do you want to remove? ID: ",
        
      }
    ])
    .then((answers) => {
      const newsid: string = answers.idofnews;
      const filteredNews = objnews.filter((news:any) => news.id !== newsid);
      if (filteredNews.length !== objnews.length) {
        saveNews(filteredNews);
        console.log("News article removed.");
      } else {
        console.log("No article found with that ID.");
      }
      continueing();
    }
    )
  
}

// Prompt the user for an action to perform. The user should be able to view the news articles, add a new news article, remove a news article, or exit the application.
// After performing the selected action, the user should be prompted again for the next action to perform.
// The application should continue running until the user chooses to exit.
function promptUser(): void {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What do you want to do?",
        choices: [
          "View all news articles",
          "View news by ID",
          "Add a news article",
          "Remove a news article",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "View all news articles":
          displayNews();
          break;
        case "View news by ID":
          displayNewsById();
          break;
        case "Add a news article":
          addNews();
          break;
        case "Remove a news article":
          removeNews();
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit(0);
          break;
      }
    });
}

// Start the application
function startApp() {
  console.log("Hello! Today we have interesting news for you.")
  promptUser()
}

startApp()
console.log()