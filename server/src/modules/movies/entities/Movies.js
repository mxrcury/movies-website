const { Movie } = require('./Movie')

class Movies {
  constructor(movies) {
    this.page = movies.page;
    this.results = movies.results.map(movie=>new Movie(movie))
    this.totalResults = movies.total_results
    this.totalPages = movies.total_pages;
  }
}

module.exports = {
    Movies
}