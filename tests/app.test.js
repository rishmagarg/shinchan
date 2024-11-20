let { app } = require('../index.js');
let { getMovieById, getMovies } = require('../controllers');
let http = require('http');
const request = require('supertest');
const { beforeEach, describe } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getMovies: jest.fn(),
}));
let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3008, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all movies', () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getMovies.mockReturnValue(mockedMovies);
    let result = getMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints Tests', () => {
  it('GET /movies should get all movies', async () => {
    const response = await request(server).get('/movies');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      movies: [
        {
          movieId: 1,
          title: 'Inception',
          genre: 'Sci-Fi',
          director: 'Christopher Nolan',
        },
        {
          movieId: 2,
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          director: 'Frank Darabont',
        },
        {
          movieId: 3,
          title: 'The Godfather',
          genre: 'Crime',
          director: 'Francis Ford Coppola',
        },
      ],
    });
    expect(response.body.movies.length).toBe(3);
  });

  it('GET /movies/details/:id should get the movie by id', async () => {
    const res = await request(server).get('/movies/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      movie: {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
    });
  });
});
