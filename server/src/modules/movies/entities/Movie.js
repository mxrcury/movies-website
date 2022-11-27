
class Movie {
    constructor(movie){
        this.id = movie.id
        this.releaseDate = movie.release_date
        this.posterPath = movie.poster_path ? movie.poster_path : "No image"
        this.title = movie.title
        this.voteAverage = movie.vote_average
    }
}

module.exports = {
    Movie
}