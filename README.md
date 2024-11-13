# Resolute AI Software Private Limited Assignment
This is the backend for a note-taking application with user authentication. It provides the following routes:

- **User Authentication**: Sign up and sign in users.
- **Notes Management**: Add, edit, update, and delete notes.

##Getting started:
1) Clone the repository by using the clone command - git clone https://github.com/Vipindrawat/Resolute-AI-software-Assignment.git
2) Steps to create and set the .env file:
    a) In the root directory of the project, create a new file named `.env`.
    b) Open the `.env` file and add the following environment variables, replacing the placeholders with your actual configuration values:
     *PORT=5000
      MONGO_URI=your_mongodb_connection_string
      MYPEPPER=thisismypepper
      JWT_SECRET=your_jwt_secret_key *

3) Install npm if not installed already.
4) Navigate to the project directory
5) Install dependencies using the ***npm install*** command.
6) To start the server run command ***npx nodemon*** .