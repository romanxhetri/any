
import React from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types.ts';

interface HeroProps {
  movie: Movie;
  onPlay?: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title}
          className="w-full h-full object-cover object-center"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-96 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute top-[20%] md:top-[30%] left-4 md:left-12 max-w-[95%] md:max-w-2xl space-y-3 md:space-y-6 animate-fade-in-up z-10">
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl leading-tight tracking-tight">
            {movie.title}
        </h1>
        
        <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-lg font-semibold text-green-400 drop-shadow-md">
            <span>{movie.matchScore}% Match</span>
            <span className="text-gray-300">{movie.year}</span>
            <span className="border border-gray-400 text-gray-200 px-1 rounded-sm text-[10px] md:text-sm">{movie.rating}</span>
            <span className="text-gray-300">{movie.duration}</span>
        </div>

        <p className="text-sm md:text-lg lg:text-xl text-gray-100 drop-shadow-lg line-clamp-3 md:line-clamp-4 max-w-sm md:max-w-lg leading-snug font-medium">
          {movie.description}
        </p>
        
        <div className="flex space-x-3 pt-1 md:pt-2">
          <button 
            onClick={onPlay}
            className="flex items-center px-4 py-1.5 md:px-7 md:py-3 bg-white text-black rounded hover:bg-gray-200 transition duration-200 font-bold text-sm md:text-xl cursor-pointer shadow-lg"
          >
            <Play className="w-4 h-4 md:w-7 md:h-7 mr-2 fill-black" />
            Play
          </button>
          <button className="flex items-center px-4 py-1.5 md:px-7 md:py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/50 transition duration-200 font-bold text-sm md:text-xl cursor-pointer backdrop-blur-sm shadow-lg">
            <Info className="w-4 h-4 md:w-7 md:h-7 mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
