Movie Watchlist App

A API to manage your movie watchlist. Built using Express.js and MongoDB, it lets you add, view, update, and delete movies.

Features

Add new movies

View all movies

View a single movie

Update movie details

Delete movies

Tech Stack

Node.js

Express.js

MongoDB

Setup

Clone the repo:

git clone https://github.com/<your-username>/movie-watchlist.git


Install dependencies:

npm install


Create a .env file with your MongoDB connection string:

DB_STRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/movies?retryWrites=true&w=majority
PORT=1400


Start the server:

npm run dev

API Endpoints

POST /movies – Add a movie

GET /movies – Get all movies

GET /movies/:id – Get a movie by ID

PUT /movies/:id – Update a movie

DELETE /movies/:id – Delete a movie

Author

Absar Ahmad – GitHub
