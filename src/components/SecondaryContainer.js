/** @format */

import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import "../App.css";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className=" bg-black">
      <div className="-mt-52 pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
        <MovieList title={"Horror Moves"} movies={movies.nowPlayingMovies} />
      </div>

      {/* 
        MovieList - Popular
          MovieCard * n
        MovieList - NowPlaying
        MovieList - Trending
        MovieList - Horrer
    */}
    </div>
  );
};

export default SecondaryContainer;
