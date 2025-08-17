const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = 1111
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'movies'

MongoClient.connect(dbConnectionStr)
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})
.catch(error => console.log(error))

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{
    db.collection('movies').find().toArray()
    .then(data => {
        response.render('index.ejs', { movies: data })
    })
    .catch(error => console.error(error))
})


app.post('/addMovie', (req,res) => {
   db.collection('movies').insertOne({
            title: req.body.title,
            genre: req.body.genre,
            year: Number(req.body.year),
            director: req.body.director,
            poster: req.body.poster,
            rating: Number(req.body.rating),
            review: req.body.review,
            watched: req.body.watched === "on", // checkbox sends "on" if checked
            watchedDate: req.body.watchedDate ? new Date(req.body.watchedDate) : null
    })
    .then(result => {
        console.log('Movie Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})



const { ObjectId } = require('mongodb')

app.delete('/deleteMovie/:id', (req, res) => {
  const movieId = req.params.id

  db.collection('movies').deleteOne({ _id: new ObjectId(movieId) })
    .then(result => {
      console.log('Movie Deleted')
      res.json({ message: 'Movie Deleted' })
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: 'Failed to delete movie' })
    })
})


app.listen(process.env.PORT || PORT, () => console.log(`Listinig on Port: ${PORT}`))