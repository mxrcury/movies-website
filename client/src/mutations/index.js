import { gql } from "@apollo/client";


export const REGISTER_USER = gql`
    mutation registerUser($registerInput:RegisterInput!){
        createUser(registerInput:$registerInput){
            username
            email
            status
        }
    }
`
export const LOGIN_USER = gql`
    mutation loginUser($loginInput:LoginInput!){
        loginUser(loginInput:$loginInput){
            username
            email
            status
            token
            settings {
                locale
                saveLists
            }
        }
    }
`
export const SAVE_MOVIE_LIST = gql`
mutation saveMovieList($listInput:ListInput!, $movieList:[MovieInput!]){
  saveMovieList(listInput:$listInput,movieList:$movieList) {
    listTitle
    link
    movies {
      id
      title
    }
  }
}
`

export const DELETE_MOVIE_LIST = gql`
mutation deleteMoviesList($token:String!,$listTitle:String!){
  deleteMovieList(listTitle:$listTitle,token:$token) {
    listTitle
    link
    movies {
      id
      posterPath
      title
      releaseDate
    }
  }
}
`

export const CHANGE_SETTINGS = gql`
mutation changeSettings($token:String,$locale:String,$saveLists:Boolean){
  changeSettings(token:$token, locale:$locale,saveLists:$saveLists) {
    locale
    saveLists
  }
}`