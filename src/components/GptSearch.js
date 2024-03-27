/** @format */

import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggesstion from "./GptMovieSuggesstion";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div>
      <div>
        <img className="fixed -z-10" alt="bg img" src={BG_URL} />
      </div>
      <GptSearchBar />
      <GptMovieSuggesstion />
    </div>
  );
};

export default GptSearch;
