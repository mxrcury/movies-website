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

const getFilteredMovies = async (filters, lang = 'en-US', page = 1) => {
  console.log('111')
  const {
    sortBy = "popularity",
    wayOfSorting = asc,
    primaryReleaseYear = new Date().getFullYear(),
    includeAdult = false,
  } = filters;
  const data = await axios.get(`${process.env.API_URL}/discover/movie?api_key=${process.env.API_KEY}&language=${lang}&sort_by=${sortBy}.${wayOfSorting}&include_adult=${includeAdult}&primary_release_year=${primaryReleaseYear}&page=${page}`)
  return data.data
}


module.exports = {
    getMovies,
    getMovie,
    getDetails,
    getFilteredMovies
}