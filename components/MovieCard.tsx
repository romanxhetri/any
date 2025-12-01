
import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  return (
    <div 
      className="group relative bg-[#181818] rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:z-50 md:hover:scale-110 shadow-lg flex-none w-[140px] md:w-[240px]"
      onClick={() => onClick(movie)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <img 
          src={movie.thumbnailUrl}
          alt={movie.title}
          className="object-cover w-full h-full rounded-md transition-all duration-300 group-hover:brightness-110"
          loading="lazy"
        />
        {/* Mobile: Title Overlay since no hover effect */}
        <div className="md:hidden absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
            <p className="text-white text-xs font-semibold truncate w-full">{movie.title}</p>
        </div>
      </div>
      
      {/* Desktop Hover Info - Only visible on md+ screens */}
      <div className="hidden md:block absolute top-full left-0 w-full bg-[#181818] p-3 rounded-b-md shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-1 z-50">
            <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-2">
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                        <Play className="w-4 h-4 fill-black text-black" />
                    </button>
                    <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white text-white transition">
                        <Plus className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white text-white transition">
                        <ThumbsUp className="w-4 h-4" />
                    </button>
                </div>
                <button className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:border-white text-white transition ml-auto">
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex items-center text-xs text-gray-300 space-x-2 font-semibold mb-1">
                <span className="text-green-400">{movie.matchScore}% Match</span>
                <span className="border border-gray-500 px-1 text-[10px]">{movie.rating}</span>
                <span>{movie.duration}</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
                {movie.genre.slice(0, 3).map((g, i) => (
                    <span key={i} className="text-[10px] text-gray-400 flex items-center">
                        {g}{i < 2 ? <span className="mx-1">•</span> : ''}
                    </span>
                ))}
            </div>
      </div>
    </div>
  );
};

export default MovieCard;
