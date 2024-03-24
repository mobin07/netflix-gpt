/** @format */

import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return; //this is also known as early return
  // initially we are not getting movies so this component was
  // giving error in movies[0]. so we have return null
  // once we get the data from the api we will render the ui
  const mainMovie = movies[0];
  console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
