import { Grid, Container } from "@mui/material"
import { useAuth } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()


  return (
    <>
      {!isAuth ? (
        <Navigate to="/login" />
      ) : (
        <>
          <Container maxWidth="false" disableGutters>
            <h1 style={{ textAlign: "center" }}>One big Popular Movie</h1>
            <hr />
          </Container>
          <Container maxWidth="xl">
            <h3 style={{ textAlign: "center" }}>popular movies</h3>
            <h3 style={{ textAlign: "center" }}>popular movies</h3>
            <h3 style={{ textAlign: "center" }}>popular movies</h3>
            <h3 style={{ textAlign: "center" }}>popular movies</h3>
          </Container>
        </>
      )}
    </>
  );
}

export default Home
