import { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, Navigate } from 'react-router-dom';
import { Box, Grid, Paper,Pagination } from '@mui/material';

import { MoviesList, SelectedMovies, Filters } from '../components';

import useMovies from "./../hooks/useMovies";
import { GET_MOVIES, MOVIES_BY_IDS } from '../query/movies';

import { Backdrop, PaginationContainer } from './styles';
import SharedMovies from './SharedMovies';
import { useCallback } from 'react';
import { Context } from './../providers/context/context';
import { FormattedMessage } from 'react-intl';
import { useAuth, useFilters } from '../hooks';
import Portal from '../components/Portal';



const Recommendations = () => {
  const [params,setParams] = useState({ids:[],title:''})
  const [ movies, setMovies ] = useState([])
  const { state } = useContext(Context)
  const { selectedMovies, selectMovie, deleteMovie } = useMovies();

  const { isAuth } = useAuth()
  const { page, handlePage } = useFilters()

  const [searchParams] = useSearchParams()

  useEffect(()=>{
      const ids = searchParams.getAll('ids')[0]
      const title = searchParams.getAll('title')[0]
      setParams({ids:(ids ? ids.split(',').map(id=>Number(id)) : window.location.search === '' && null),title})
  },[searchParams])

  const {data:moviesByIdsData} = useQuery(MOVIES_BY_IDS,{variables:{ids:params.ids, locale:state.locale}})

  const { loading } = useQuery(GET_MOVIES, {
    onCompleted: (data) => {
      const { movies } = data
      setMovies(movies);
    },
    variables: { page, locale: state.locale },
  });
  const onAddMovie = useCallback((movie) => {
    selectMovie(movie);
  },[selectMovie])

  const onDeleteMovie = (id) => {
    deleteMovie(id);
  };

  if (loading) {
    return (
      <>
        <Portal>
          <Backdrop>
            <h1 style={{ textAlign: "center", position: "absolute" }}>
              <FormattedMessage id="loading" />
            </h1>
          </Backdrop>
        </Portal>
      </>
    );
  }
  return (
    <>
      {!isAuth && !params.ids ? <Navigate to="/login" /> : null}
      {moviesByIdsData && moviesByIdsData.moviesByIds.length ? (
        <SharedMovies params={params} movies={moviesByIdsData.moviesByIds} />
      ) : null}
      {!params.ids ? (
        <Box sx={{ flexGrow: 1, margin: "20px 35px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper>
                <Filters setMovies={setMovies} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <MoviesList
                popularMovies={movies}
                onAddMovie={onAddMovie}
              />
            </Grid>
            <SelectedMovies
              selectedMovies={selectedMovies}
              deleteMovie={onDeleteMovie}
            />
            {movies ? (
              <PaginationContainer>
                <Pagination
                  count={movies.totalPages}
                  page={page}
                  onChange={handlePage}
                  color="secondary"
                />
              </PaginationContainer>
            ) : null}
          </Grid>
        </Box>
      ) : null}
    </>
  );
};
  
  export default Recommendations
  