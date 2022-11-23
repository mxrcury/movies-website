
class Movie {
    constructor(movie){
        this.id = movie.id
        this.releaseDate = movie.release_date
        this.posterPath = movie.poster_path
        this.title = movie.title
        this.voteAverage = movie.vote_average
    }
}

module.exports = {
    Movie
}