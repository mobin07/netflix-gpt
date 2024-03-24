/** @format */

import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-32 px-12 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-lg w-1/3">{overview}</p>
      <div>
        <button className="bg-gray-500 text-white p-4  px-12 text-lg bg-opacity-50 hover:bg-opacity-80 rounded-lg">
          ▷ Play
        </button>
        <button className="bg-gray-500 text-white p-4 mx-2 px-12 text-lg bg-opacity-50 hover:bg-opacity-80 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
