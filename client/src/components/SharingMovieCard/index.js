import React, { useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { CardContent, Box } from "@mui/material"
import GradeIcon from '@mui/icons-material/Grade';
import { Link } from 'react-router-dom'

import { Card, CardImg, Button,Info , Rating, Time, Description, Subtitle } from "./styles"


const SharingMovieCard = ({movie}) => {
  const [genres, setGenres] = useState([])

  useEffect(()=>{
  const genres = movie.genres.map(genre=>genre.name)
  setGenres(genres)
  },[])

  return (
    <Card>
      <CardImg
        src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
        alt={movie.title}
      />
      <CardContent sx={{ maxHeight: "230px" }}>
        <h3>{movie.title}</h3>
        <Info>
          <Rating
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
          <Subtitle>Genres:</Subtitle>{genres.join(',')}
            {/* <GradeIcon sx={{ color: "#ffc107" }} />
            {movie.voteAverage} */}
          </Rating>
          <Time>{movie.releaseDate}</Time>
        </Info>
        <Description>{movie.overview}</Description>
      </CardContent>
      {/* <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          margin: "0 10px 5px 10px",
          paddingBottom: "10px",
        }}
      >
        <Button component={Link} to={`/movie/${movie.id}`} color="secondary" variant="contained">
          Info
        </Button>
      </Box> */}
    </Card>
  );
}

SharingMovieCard.propTypes = {
  movie:PropTypes.object.isRequired,
}

SharingMovieCard.defaultProps = {
  movie:{}
}
export default SharingMovieCard
