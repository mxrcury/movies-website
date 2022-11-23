const axios = require('axios')

const getMovies = async (page,lang) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=${lang}&page=${page}`
  );
  const { data } = response;

  return data;
};

const getMovie = async (id,lang) =>{
  const response = await axios.get(
    `${process.env.API_URL}movie/${id}?api_key=${process.env.API_KEY}&language=${lang}`
  );
  
  const { data } = response
  return data
}

const getDetails = (id, lang) => {
  return axios.get(`${process.env.API_URL}movie/${id}?api_key=${process.env.API_KEY}&language=${lang}`)
}

const getFilteredMovies = (filters) => {
  const { } = filters
  return axios.get(`${proccess.env.API_URL}/discover/movie?api_key=${process.env.API_KEY}&language=${lang}`)
}


module.exports = {
    getMovies,
    getMovie,
    getDetails
}