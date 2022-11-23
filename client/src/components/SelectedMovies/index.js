import React,{ useContext, useState } from 'react'
import { Grid } from '@mui/material';
import { Container, SelectedMoviesContainer,Img  } from './styles';
import MovieCardSelected from '../MovieCardSelected';
import SelectedMoviesForm from '../SelectedMoviesForm';
import useToggle from './../../hooks/useToggle';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_MOVIE_LIST } from '../../mutations';
import useAuth from './../../hooks/useAuth';
import { SelectedMovie } from './entities';
import { GET_SAVED_LISTS } from '../../query/movies';
import { ACTIONS } from './../../providers/context/constants';
import { Context } from './../../providers/context/context';
import { FormattedMessage } from 'react-intl';



const SelectedMovies = ({selectedMovies, deleteMovie}) => {

  const [ shareLink, setShareLink ] = useState('')
  const [ listName, setListName ] = useState('')
  const { state, dispatch } = useContext(Context)
  
  const modal = useToggle(false)
  const { token } = useAuth()

  const { refetch } = useQuery(GET_SAVED_LISTS, {
    variables: { token },
    onCompleted: (data) => {
      dispatch({type:ACTIONS.SET_SAVED_LISTS,savedLists:data.getSavedMovieLists});
    },
    });

  
  const [ saveMovieList ] = useMutation(SAVE_MOVIE_LIST,{
    onCompleted:()=>{
      refetch()
    },
    onError:(err)=>{
      console.log(JSON.stringify(err))

    }
  })

  const onSubmit = (e) => {
    if (selectedMovies.length) {
      setListName(e.listName)
      const ids = selectedMovies.map(({ id }) => id);
      const link = `http://${window.location.host}/recommends?title=${
        e.listName
      }&ids=${ids.join()}`;
      setShareLink(link);
      modal.toggle();
      const movieList = selectedMovies.map((movie) => new SelectedMovie(movie));
      if(state.saveLists){
      saveMovieList({
        variables: {
          listInput: { token, listTitle: e.listName, link },
          movieList,
        },
      });
      }
    }
  }
  const onSaveMovieList = () => {

    const ids = selectedMovies.map(({ id }) => id);
    const link = `http://${window.location.host}/recommends?title=${listName}&ids=${ids.join()}`;
    const movieList = selectedMovies.map((movie) => new SelectedMovie(movie));

    saveMovieList({variables:{listInput:{token, listTitle:listName,link},movieList}})
    modal.toggle()
  } 

  return (
    <>
      <Grid item xs={12} md={4}>
        <SelectedMoviesContainer>
          {selectedMovies.length ? (
            <>
              <Container>
                {selectedMovies.map((movie) => (
                  <MovieCardSelected movie={movie} deleteMovie={deleteMovie} />
                ))}
              </Container>
              <SelectedMoviesForm
                onSubmit={onSubmit}
                shareLink={shareLink}
                modal={modal}
                onSaveMovieList={onSaveMovieList}
              />
            </>
          ) : (
            <>
              <h2 style={{textAlign:'center'}}> <FormattedMessage id='recommends.add_movie_to_list' />.</h2>
              <Img src='https://www.pngmart.com/files/5/Movie-PNG-Image.png' alt='No selected movies' />
            </>
          )}
        </SelectedMoviesContainer>
      </Grid>
    </>
  );
}

export default SelectedMovies
