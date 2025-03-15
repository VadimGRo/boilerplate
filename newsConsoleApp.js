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
function continueing(){
  rl.question(" 1 - Back to menu \n 2 - Continue here \n 3 - Exit \n Action: ", (answer) => {
    switch(answer){
      case "1":
        promptUser();
        break;
      case "2":
        displayNews();
        break;
      case "3":
        rl.close();
        break;
      default:
        console.log("Invalid option. Try again.");
        promptUser();
    }})
}

// Display the news articles. If there are no news articles available, display a message saying "No news articles available."
// The news articles should be displayed in the following format:
// Current Sports News:
// ID: 1 - Title of the news article
// ID: 2 - Title of the news article
function displayNews() {
    let result = "";
    
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
function displayNewsById() {
 
  
  const objnews = loadNews()
  
  rl.question("What news do you want to see?", (id) => {
    const news = objnews.find(news => news.id === parseInt(id)) //find news by id
    if (news) {
      console.log("Title: " + news.title + "\n" + "Content: " + news.content);
    } else {
      console.error("No article found with that id!");
    }
    continueing()
  
})
}



// Add a new news article to the list of news articles. The user should be prompted to enter the title and content of the news article.
// The new article should have an ID that is one greater than the ID of the last article in the list.
// After adding the news article, save the updated list of news articles to the JSON file and display a message saying "News article added."
function addNews() {
  
  const objnews = loadNews()
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
  
  continueing()
});

  });

}

// Remove a news article from the list of news articles. The user should be prompted to enter the ID of the news article to remove.
// If the news article with the specified ID is found, remove it from the list of news articles.
// After removing the news article, save the updated list of news articles to the JSON file and display a message saying "News article removed."
// If no news article is found with the specified ID, display a message saying "No article found with that ID."
function removeNews() {
  
  const objnews = loadNews()
  rl.question("What news do you want to remove? ID: ", (id) => {
    const filteredNews = objnews.filter((news) => news.id !== parseInt(id));

    if (filteredNews.length !== objnews.length) {
    saveNews(filteredNews); 
    console.log("News article removed.");
    } else {
    console.log("No article found with that ID.");
    }
  
    continueing()
  })

}

// Prompt the user for an action to perform. The user should be able to view the news articles, add a new news article, remove a news article, or exit the application.
// After performing the selected action, the user should be prompted again for the next action to perform.
// The application should continue running until the user chooses to exit.
function promptUser() {
  rl.question("What do you want to do? \n 1 - View the all news article \n 2 - View news by ID \n 3 - Add a new news article \n 4 - Remove a news article \n 5 - exit \n Action: ", (answer) => {
    switch (answer){
      case "1":
        displayNews();
        promptUser();
        break;
      case "2":
        displayNewsById();
        promptUser();
        break;
      case "3":
        addNews();
        promptUser();
        break;
      case "4":
        removeNews();
        promptUser();
        break;
      case "5":
        rl.close();
      default:
        console.log("Invalid option. Try again.");
        promptUser();
        break;
    }
  })
}

// Start the application
function startApp() {
  console.log("Hello! Today we have interesting news for you.")
  promptUser()
}

startApp()
console.log()