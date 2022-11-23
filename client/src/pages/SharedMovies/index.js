import React from 'react'
import {  SharingMovieCard } from '../../components'
import { Title, FlexContainer } from './styles'

const SharedMovies = ({params, movies}) => {

  return (
    <>
      <Title>{params.title}</Title>
      <FlexContainer>
        {movies.map((movie) => (
          <SharingMovieCard movie={movie} key={movie.id}/>
        ))}
      </FlexContainer>
      {/* {movies.map((movie) => (
        <li>{movie.title}</li>
      ))} */}
    </>
  );
}

export default SharedMovies
