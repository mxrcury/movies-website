import React from 'react'


import { Card, CardContent, Typography, Box, Paper, MenuItem, Menu } from "@mui/material"
import { CardImg, MoreButton } from './styles'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useToggle} from '../../hooks';
import CardMenu from './CardMenu';


const MovieCardSelected = ({movie, deleteMovie}) => {
  const moreModal = useToggle()

  return (
    <Card sx={{ display: "flex", position: "relative", marginBottom: "20px" }}>
      <CardImg
        src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" sx={{fontSize:'17px',padding:0}}>
            {movie.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{fontSize:'15px'}}
          >
            Genres: {`fiction`}
          </Typography>
        </CardContent>
      </Box>
      <MoreButton onClick={(e) => moreModal.toggleWithEvent(e)}>
        <MoreVertIcon sx={{ fontSize: "28px" }} />
      </MoreButton>
      <CardMenu deleteMovie={deleteMovie} modal={moreModal} id={movie.id}>Delete</CardMenu>
    </Card>
  );
}

export default MovieCardSelected
