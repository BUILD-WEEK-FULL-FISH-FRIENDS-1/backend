# Fish Friends Backend
This repo provides and API for use by Fish Friends build week 2020.
The server runs in Node.js enviroment and is built using the Express.js framework.

# Getting Started
## The Base URL is:
```
https://fish-friends-2020.herokuapp.com/
```
# Enpoints
Quick Links: [Logs Overview](#logs-overview) | [User Overview](#user-overview) | [Registration / Login Overview](#regi-login-overview)

## Logs Overview
| Method | Endpoint                  | Requires                          | Description                                              |
|--------|---------------------------|-----------------------------------|----------------------------------------------------------|
|  GET   | `/api/logs/`              |              nothing              | Used to retireve a lits of all logs posted by users from the site.|

---

## User Overview
| Method | Endpoint                  | Requires                          | Description                                              |
| -------| ------------------------- | --------------------------------- | -------------------------------------------------------- |
|  GET   | `/api/user/:id/`          | authorization header given when logging in  | Used to retireve a users information                     |
|  GET   | `/api/user/:id/logs/`     | authorization header given when logging in  | Used to retrieve an array of a user's logs               |
|  POST  | `/api/user/:id/logs/`     | title, userId, location, log, score (bait and fish are optional)    | Used to add a new log with an id to link it to a user    | 
|  PUT   | `api/user/:id/logs/:id`   | title, userId, location, log, score (bait and fish are optional)     | Used to edit a log with an id to link it to a user       |

---

## Registration / Login Overview
| Method | Endpoint                  | Requires                          | Description                                              |
| ------ | ------------------------- | --------------------------------- | -------------------------------------------------------- |
|  POST  | `/api/auth/login/`        | username and password             | Used to login and receive a JWT token to be used as an authorization header                                    |
|  POST  | `/api/auth/register/`     | username and password             | Used to add a new user account to the db                |
