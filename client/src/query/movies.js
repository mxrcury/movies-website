import { gql } from "@apollo/client";


export const GET_MOVIES = gql`
    query getMovies($page:Int, $locale:String){
    movies(page:$page, lang:$locale){
      page
      totalPages
      totalResults
      results {
        id
        title
        voteAverage
        releaseDate
        posterPath
      }
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query ($id: ID!,$locale:String) {
    getMovieById(id: $id,lang:$locale) {
      id
      title
      releaseDate
      iso {
        name
        iso
      }
      genres {
        id
        name
      }
      posterPath
      popularity
      budget
      overview
      productionCompanies {
        id
        name
        logoPath
      }
      runtime
    }
  }
`;
export const MOVIES_BY_IDS = gql`
  query ($ids: [Int!],$locale:String) {
    moviesByIds(ids: $ids, lang:$locale) {
      id
      title
      releaseDate
      iso {
        name
        iso
      }
      genres {
        id
        name
      }
      posterPath
      popularity
      budget
      overview
      productionCompanies {
        id
        name
        logoPath
      }
      runtime
    }
  }
`;

export const GET_SAVED_LISTS = gql`
query($token:String!){
  getSavedMovieLists(token:$token){
    link
    listTitle
    movies {
      id
      releaseDate
      posterPath
      title
    }
  }
}
`

export const GET_SETTINGS = gql`
query getUserSettings($token:String){
  getUserSettings(token:$token) {
    locale
    saveLists
  }
}
`

export const FILTERED_MOVIES = gql`
query filteredMovies($filtersInput:FiltersInput,$lang:String, $page:Int){
  filteredMovies(filtersInput:$filtersInput, lang:$lang, page:$page) {
    page
    results {
      id
      title
      voteAverage
      releaseDate
      posterPath
    }
    totalResults
    totalPages
  }
}
`