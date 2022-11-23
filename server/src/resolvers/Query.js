const axios = require('axios')
const { ObjectId } = require('mongodb')
const { getMovies, getMovie,getDetails } = require('../modules/movies');

const { Movies } = require('../modules/movies/entities/Movies');
const { Movie } = require('../modules/movies/entities/Movie');
// const { Movie } = require('../modules/movies/entities/Movie');
const { MovieInfo } = require('../modules/movies/entities/MovieInfo');
const { Genre } = require('../modules/movies/entities/Genre');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const tokenVerify = (token) => {
    return jwt.verify(token,process.env.SECRET_KEY)
  }  

const movies = async (_,args) => {
    const data = await getMovies(args.page,args.lang)

    return new Movies(data)
};

const getMovieById = async (_,args) => {
    const data = await getMovie(args.id,args.lang)
    return new MovieInfo(data)
}

const moviesByIds = async (_, { ids, lang }) => {
    console.log(lang);
    const requests = ids.map((id) => getDetails(id, lang));
    const response = await Promise.all(requests);
    const data = response.map((movie) => new MovieInfo(movie.data));
    return data;
};

const getSavedMovieLists = async (_,{ token }) => {
    const decodedData = tokenVerify(token)
    const user = await User.findById({_id:decodedData.id})

    return [...user.savedMovies]
}

const getUserSettings = async (_,{ token }) => {
    const decodedData = tokenVerify(token)
    const user = await User.findById({_id:decodedData.id})

    return {locale:user.settings.locale,saveLists:user.settings.saveLists}
}

const filteredMovies = (_,args) => {

}

module.exports = {
    movies,
    getMovieById,
    moviesByIds,
    getSavedMovieLists,
    getUserSettings
}