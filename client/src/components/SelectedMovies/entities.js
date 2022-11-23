export class SelectedMovie{
    constructor(movie){
        this.id = movie.id
        this.title = movie.title
        this.releaseDate = new Date(movie.releaseDate).toDateString()
        this.posterPath = movie.posterPath
    }
}