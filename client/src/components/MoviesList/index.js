import React from 'react'
import {Grid,Paper} from '@mui/material'
import MovieCard from '../MovieCard'

const MoviesList = ({popularMovies, onAddMovie}) => {

  return (
    <Grid container spacing={4}>
                {popularMovies ? (
                  popularMovies.results.map((movie) => (
                    <Grid item xs={6} md={4} key={movie.id}>
                      <Paper sx={{ margin: "5px" }}>
                        <MovieCard movie={movie} onAddMovie={onAddMovie} />
                      </Paper>
                    </Grid>
                  ))
                ) : (
                  <h1>No movies have found.</h1>
                )}
              </Grid>
  )
}

export default MoviesList
