const { Genre } = require("./Genre")
const { ProductionCompanies } = require("./ProductionCompanies")
const { SpokenLanguages } = require("./SpokenLanguages")


class MovieInfo{
    constructor(movie){
        this.id = movie.id
        this.releaseDate = movie.release_date
        this.iso = movie.spoken_languages.map(lang=>new SpokenLanguages(lang))
        this.genres = movie.genres.map(genre=> new Genre(genre))
        this.posterPath = movie.poster_path
        this.title = movie.title
        this.voteAverage = movie.vote_average
        this.productionCompanies = movie.production_companies.map(prodcomp => new ProductionCompanies(prodcomp))
        this.runtime = movie.runtime
        this.budget = movie.budget
        this.overview = movie.overview
    }
}

module.exports = {
    MovieInfo
}