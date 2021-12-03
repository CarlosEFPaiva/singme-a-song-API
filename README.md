# singme-a-song-API

## About this Project

This project was developed as part of the Driven Web Full-Stack Bootcamp, a 6-month bootcamp where I started my journey as a web developer.

It is an simple API for organizing and suggesting recommendations for songs using youtubeLinks. Its front-end was not developed.

The code for this project was developed in English.

## Functionalities

- Send new recommendations to the database, with the proper youtube Link and a name for the song.

- Evaluate other recommendations, voting it as a good or a bad one.

- We listen to our community! Every recommendation that reaches a low score limit is automatically deleted from the database.

- You can ask to get random recommendations, so you will never get bored listening to the same songs everyday!

- You can also ask for the top songs only, setting the amount of songs you want to get from out Top tier!

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment to run a Node.js App.

- Run it locally: take note that it will be set in port 4000. If you wish another port, make sure to set it as an enviroment variable.

- Database: The app is set to work with a DATABASE_URL sent as an environment variable. When using Heroku, for example, this URL is given with the information of the created database.

### Running

The following scripts are set for better using of the app:

- start -> Will start the app locally, setting to use the development database.

- dev -> Will start the app locally using nodemon package, which allows changes to be automatically updated to the running server.

- test -> Will run the test files once, setting to use the testing database. For now, there are only unit tests applied to the project, none in need to use a database, but the settings for integration tests are already set.

- test:watch -> will run the same tests as the previous script, but constantly, re-running at each change on any file of the app. It might be useful in case a change is being done, as it shows in real-time if any test has started to fail after a change.

## Built With

- [Express](https://expressjs.com/) - Web Framework for Noje.js
- [ESlint](https://eslint.org/) - Linter
- [Babel](https://babeljs.io/) - JavaScript Compiler
- [DotEnv](https://www.npmjs.com/package/dotenv) - Configs from .env file
- [Jest](https://jestjs.io/) - Framework for testing
- [Joi](https://www.npmjs.com/package/joi) - Validates data before proceeding to its processing
