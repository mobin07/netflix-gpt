/** @format */

import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGPTMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langUsed = useSelector((store) => store.config?.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  //  search movie in tmdb
  const searchMovieTmdb = async (movie) => {
    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1";
    const data = fetch(url, API_OPTIONS);
    const json = await data.json();

    return json.results;
  };

  const handleGPTSearchClick = async () => {
    console.log("in handleGPTSearchClick", searchText.current.value);

    const gptQuery =
      "Act as a movie recommenedation system and suggest some movies for the query :" +
      searchText.current.value +
      ". Only give me name of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Pathaan , Don, Golmaal, Koi Mil Gaya ";
    // Make an API call to GPT API and get Movie Results
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults?.choices) {
      // handle the error
    }
    console.log(gptResults.choices?.[0]?.message?.content);
    // Gadar, Pathaan , Don, Golmaal, Koi Mil Gaya
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    //  [ "Gadar", "Pathaan" , "Don", "Golmaal", "Koi Mil Gaya"]
    // For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTmdb(movie));
    //  the result I'm getting in the above is array of promises as async function always return promises
    // Promise takes some time to resolve
    // Now how will we resolve promise array means get data of each promise array
    // there is a function Promise.all() takes the array of promises and

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResult: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className=" w-1/2  bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9"
          placeholder={lang[langUsed].gptSearchPlaceholder}
        />
        <button
          className="py-2 px-4 bg-red-700 col-span-3 m-4 text-white rounded-lg"
          onClick={handleGPTSearchClick}
        >
          {lang[langUsed].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
