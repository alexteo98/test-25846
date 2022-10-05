# CS3219 Task B

Simple API deployed to heroku.

## Instructions for testing on localhost
1. Clone this repository and navigate to project root
1. Run `npm install`
1. Run `npm start`
1. Using Postman, send 'GET', 'POST', 'PUT', 'DELETE' requests to http://localhost:3000/api
1. To run tests, run `npm test`


## Instructions for testing on deployed endpoint
1. Using Postman, send 'GET', 'POST', 'PUT', 'DELETE' requests to 'https://test-25846.herokuapp.com/api'
1. To view CI test results, go to: https://github.com/alexteo98/test-25846/actions
1. Click on specified workflow -> test -> `Run npm test`

## Task B1 - Backend
- [x] Successful GET, POST, PUT, DELETE API calls on localhost
- [x] Successful GET, POST, PUT, DELETE API calls to deployed endpoints (Heroku)
- [?] Handle common edge cases and error-resiliency

## Task B2.1 - Continuous Testing 
- [x] Successful testing for API using Mocha/Chai
- [x] Use Github Actions to automate testing

## Task B2.2 - Continuous Deployment
- [x] Use GIthub Actions to automatically deploy to Heroku

## Task B3 - Frontend
- [] Interact with the API using the frontend
- [] Implementation of style e.g., using Bootstrap

## Task B4 - Pull data from serverless function
- [] Deploying a serverless function to Google Functions/AWS Lambda/Azure Functions
- [] Ability to interact with the serverless API using the frontend

