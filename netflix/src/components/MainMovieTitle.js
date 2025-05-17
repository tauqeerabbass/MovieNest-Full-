// import React from 'react'

// const MainMovieTitle = ({title, overview}) => {
//   const movieDetail = useSelector((store) => store.movie?.movieTrailers);

//   return (
//     <div className='w-[545px] mt-36 px-[75px] absolute text-white pt-24 pb-24 bg-gradient-to-r from-black'>  
//       <h1 className='text-4xl font-bold'>{title}</h1>
//       <p className='py-4 mb-4'>{overview}</p>
//       <div>
//         <button className='bg-white rounded-lg py-3 px-8 text-xl text-black hover:bg-opacity-80'>▷ Play</button>
//         <button className='bg-gray-500 rounded-lg py-3 px-8 text-xl text-white mx-2 bg-opacity-50'>ⓘ More Info</button>
//       </div>
//     </div>
//   )
// }

// export default MainMovieTitle;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_OPTIONS } from '../utils/constans';

const MainMovieTitle = ({ title, overview, id }) => {
  const navigate = useNavigate();
  const movieDetail = useSelector((store) => store.movie?.movieTrailers);

  const [movie, setMovie] = useState();

  const fetchMovie = async () => {
     const movieData = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          API_OPTIONS
        );
        const json = await movieData.json();
        setMovie(json);
        console.log(json.id);
  }

  useEffect(()=>{
    fetchMovie();
  }, []);

  const handleNavigate = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className='w-[545px] mt-36 px-[75px] absolute text-white pt-24 pb-24 bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='py-4 mb-4'>{overview}</p>
      <div>
        <button
          onClick={handleNavigate}
          className='bg-white rounded-lg py-3 px-8 text-xl text-black hover:bg-opacity-80'
        >
          ▷ Play
        </button>
        <button
          onClick={handleNavigate}
          className='bg-gray-500 rounded-lg py-3 px-8 text-xl text-white mx-2 bg-opacity-50'
        >
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default MainMovieTitle;
