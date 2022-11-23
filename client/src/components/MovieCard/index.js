import { CardContent, Box } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import GradeIcon from '@mui/icons-material/Grade';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import { Card, CardImg, Button,Info , Rating, Time } from "./styles"
import { FormattedMessage } from "react-intl";


const MovieCard = ({movie, onAddMovie}) => {

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
            <GradeIcon sx={{ color: "#ffc107" }} />
            {movie.voteAverage}
          </Rating>
          <Time>{movie.releaseDate}</Time>
        </Info>
      </CardContent>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          margin: "0 10px 5px 10px",
          paddingBottom: "10px",
        }}
      >
        <Button component={Link} to={`/movie/${movie.id}`} color="secondary" variant="contained">
          <FormattedMessage id='recommends.info' />
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={()=>onAddMovie(movie)}
          sx={{ width: "10%", marginLeft: "10px" }}
        >
          <AddIcon />
        </Button>
      </Box>
    </Card>
  );
}

MovieCard.propTypes = {
  movie:PropTypes.object.isRequired,
  onAddMovie:PropTypes.func
}

MovieCard.defaultProps = {
  movie:{}
}


export default MovieCard
