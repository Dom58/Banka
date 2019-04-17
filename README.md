# Banka
[![Build Status](https://travis-ci.com/Dom58/Banka.svg?branch=develop)](https://travis-ci.com/Dom58/Banka)  [![Coverage Status](https://coveralls.io/repos/github/Dom58/Banka/badge.svg?branch=develop)](https://coveralls.io/github/Dom58/Banka?branch=develop)

# Description
Banka is a light-weight core banking application that powers banking operations like account creation, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money...

<p> User is able to create sign in alone, and create a bank account everywhere even at his/her home, but must go to any branch to withdraw or deposit money </p>

# Setup
- You need to have `git`, `NodeJS` and `NPM` installed on your local environment.
- Clone the application with `git clone` command and after go and paste the link of clonning the repo
- `npm install` to install all the dependencies in local environment
- `npm update` updating the dependencies if any.

# Dependencies
- `NodeJs` Runtime environment that helps to run JavaScript on the server or apart of a browser.
-  `Express` NodeJS framework used for making the back-end.
-  `Joi` for API request body error validation.

# To Getting Started
Starting application run the following npm command
* `npm run server:start` for starting the server.

# For Testing
When you need to test this application and see the tests coverate rate:
* `npm run test` for running the tests, and getting coverage rate summary.

# APIs

* POST `/api/v1/auth/signup` signup on banka application.
* POST `/api/v1/auth/signin` signin on banka application. 

* POST `/api/v1/accounts` Create a bank account.
* GET `/api/v1/accounts` view all banka accounts.
* PATCH `/api/v1/accounts/:id` Activate the status of bank account Active/Draft.
* DELETE `/api/v1/accounts/:id` Delete bank account.

* POST `/api/v1/transactions/:accountNumber/credit` Credit a user bank account like deposit.
* POST `/api/v1/transactions/:accountNumber/debit` Debit a user bank account like withdrwing.

# HEROKU 
The BANKA API endpoints are deployed on heroku use this link to navigate the endpoints: https://banka2019.herokuapp.com/

# Github-page
GitHub page (gh-page) for this project BANKA application will be accessed using this link: https://dom58.github.io/Banka/
and you may use the dummy password and email to see it like:
* if you want to loggin in as Admin use those email (dom@gmail.com or admin@gmail.com) no matter about the password field fill any you want will be work
* Accessing as an Cashier use this email (cashier@gmail.com) 
* Accessing as a user or Client you an email you want like( username@example.com )
