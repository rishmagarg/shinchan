const express = require('express');
const { getMovieById, getMovies } = require('./controllers');
const app = express();

app.use(express.json());

app.get('/movies', async (req, res) => {
  const movies = getMovies();
  res.json({ movies });
});

app.get('/movies/details/:id', async (req, res) => {
  const movie = getMovieById(parseInt(req.params.id));

  res.json({ movie });
});

module.exports = { app };
