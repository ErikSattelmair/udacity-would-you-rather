# Would You Rather

## Introduction

Would You Rather is the second milestone project of Udactiy's React nanodegree program.

The game principle is very simple as the goal is to answer questions that start with the phrase "Would you rather" and provide two possible options to chose from.

Following actions can be used:
- **Login as an existing user**
- **Create a new user account**
- **View answered and unanswered questions**
- **View statstics of answered questions**
- **See where you rank compared to other users on the leaderboard**
- **Search questions and users by their id**
- **Create an own question**

## Run it

### npm

NPM is the easiest and fastest way to get started. It is also the recommended installation method when building single-page applications (SPAs). It pairs nicely with a CommonJS module bundler such as Webpack. 

To start the game, navigate to the "/would-you-rather" directory via command line interface and execute the following commands. 

```sh
# install all needed packages that are described in package.json
$ npm i
# start the webpack server
$ npm start
```

If everything went well, the command line will print the URL, the application can be reached via browser.
**Attention:** If you are starting the application from within the Udacity workspace, you have to click the "Preview" button!

To stop the server, press CTRL + C in the command line.

## What will you get? ##

The project structure looks as follows:
```bash
├── README.md - This file.
├── package.json # npm package manager 
├── package-lock.json # npm package manager 
├── .gitignore # git ignore file
├── public
│   ├── favicon.ico # React Icon
│   └── index.html #Central html file which is the anchor for the React app
└── src
	├── actions
    	├── authedUser.js # actions, regarding the authed user data of the store
        ├── questions.js # actions, regarding the questions data of the store
        ├── shared.js # action for initial data fetching
        ├── users.js # actions, regarding the users data of the store
    ├── backend
    	├── _DATA.js # backend API simulating fake backend calls
    ├── components
    	├── App.js # main application, specifies router and defines routes
        ├── Category.js # displays questions by category
        ├── CreateQuestion.js # form for question creation
        ├── CreateUser.js # form for user creation
        ├── Home.js # displays home view
        ├── LeaderBoard.js # displays leaderboard
        ├── LoggedOut.js # will be displayed when user is logged out
        ├── Login.js # container for login button and createUser button
        ├── NavigationBar.js # displays navigation bar
        ├── NotFound.js # will be displayed in case of 404 request
        ├── Question.js # dispays a specific question
        ├── QuestionList.js # container for list of questions
        ├── QuestionStatistics.js # displays statistics of answered questions
        ├── Search.js # container for search bar and search reqeust button in the nav bar 
        ├── SearchResult.js # renders search results
        ├── User.js # dispays a specific user
    ├── middleware
    	├── index.js # combined thunk and logger middleware
        ├── logger.js # logger middleware to log all dispatched store actions
    ├── reducers
    	├── authedUser # reducers regarding the authedUser data of the store
        ├── inex # returns combined reducers including the loadingBar reducer, to dispatch loading events
        ├── questions # reducers regarding the questions data of the store
        ├── users # reducers regarding the users data of the store
    ├── utils
    	├── questionUtils # contains util methods for obtaining specific questions
        ├── userUtils # contains util methods for obtaining specific users
    ├── index.js # used for DOM rendering     
```