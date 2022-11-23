import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Grid, Typography } from "@mui/material";

import { GET_MOVIE_BY_ID } from "../query/movies";

import { Poster, Container, Title, CompanyLogo, FlexContainer } from "./styles";
import { useAuth } from "../hooks";
import { Context } from './../providers/context/context';

const MoviePage = () => {
  const { id } = useParams();
  const { state } = useContext(Context)
  const { data, loading, error } = useQuery(GET_MOVIE_BY_ID, { variables: { id, locale:state.locale } });

  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if(!isAuth){
    navigate('/login')
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return (
      <>
        <h1 style={{ margin: 0 }}>Something went wrong.</h1>
        <br />
        <h3 style={{ margin: 0 }}>Error: {error.message}</h3>
      </>
    );
  }

  const { getMovieById: movie } = data;

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item md={6}>
            <Poster
              src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
              alt={`${movie}`}
            />
          </Grid>
          <Grid item md={6}>
            <h1>{movie.title}</h1>
            <h4>{movie.overview}</h4>
            <div>
              <Typography variant="p">
                <Title>Date release:</Title> {movie.releaseDate}
              </Typography>
            </div>
            <div>
              <Typography variant="p">
                <Title>Genres: </Title>
                {movie.genres.map((genre, index) => {
                  if (index !== movie.genres.length - 1) {
                    return `${genre.name}, `;
                  } else {
                    return genre.name;
                  }
                })}
              </Typography>
            </div>
            <div>
              <Typography variant="p">
                <Title>Budget of Movie:</Title> {movie.budget}
              </Typography>
            </div>
            <div>
              <Typography variant="p">
                <Title>Time:</Title> {(movie.runtime * 0.01).toFixed(2)} hours
              </Typography>
            </div>
            <div>
              <Typography variant="p">
                <Title>Production Companies:</Title>
              </Typography>
            </div>
            <FlexContainer>
              {movie.productionCompanies.map(({ name, logoPath }, index) => (
                <div>
                  {logoPath ? (
                    <CompanyLogo
                      src={`https://image.tmdb.org/t/p/original/${logoPath}`}
                      alt={name}
                    />
                  ) : (
                    <span style={{ marginRight: "5px" }}>
                      {index !== movie.productionCompanies.length - 1
                        ? `${name}, `
                        : name}
                    </span>
                  )}
                </div>
              ))}
            </FlexContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MoviePage;
