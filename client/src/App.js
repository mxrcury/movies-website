import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { useLocation } from 'react-router-dom';

import { CssBaseline, Box } from "@mui/material";

import { Settings, Recommendations, Home, Login, Register, Movie, SharedMovies, Profile } from "./pages";
import { Navigation } from "./components";
import { saveToStorage } from './utils/sessionStorage';



const App = () => {

  const location = useLocation()

  if(location.pathname !== '/recommends'){
      saveToStorage("selectedMovies", null);    
  } 

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Navigation />
        <Box sx={{backgroundColor:(theme)=>theme.palette.grey[100], height:'100vh',overflow:'auto'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommends" element={<Recommendations />} />
          {/* <Route path="/recommends?title&ids=:id" element={<SharedMovies />} /> */}
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
        </Box>
      </div>
    </>
  );
};

export default App;
