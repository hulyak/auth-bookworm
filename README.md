# User Authentication With Express and Mongo

A custom user authentication system that controls users access to web resources using Node.js, Express and MongoDB. The system lets users sign up, log in, and log out, limiting access to password-protected resources. User's session id is stored with `connect-mongo` and `express-session` modules. User's password is hashed and salted.

## Installation

```bash
> npm install
> npm start

# start Mongo
> mongod

# see the user data
> mongo 
```