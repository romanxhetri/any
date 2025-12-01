
import React from 'react';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';
import { Movie } from '../types';

interface ModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose, onPlay }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 overflow-y-auto pt-10 pb-10 px-2 md:px-0">
        <div 
            className="fixed inset-0"
            onClick={onClose}
        ></div>
        
      <div className="relative bg-[#181818] w-full max-w-[850px] rounded-lg shadow-2xl overflow-hidden animate-fade-in-up flex flex-col my-auto md:my-0">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#181818] flex items-center justify-center hover:bg-white/10"
        >
          <X className="text-white w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative h-48 md:h-[480px] w-full shrink-0">
          <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 md:bottom-12 left-4 md:left-12 space-y-2 md:space-y-4 right-4">
            <h2 className="text-2xl md:text-5xl font-bold text-white leading-tight">{movie.title}</h2>
            <div className="flex space-x-2 md:space-x-3">
              <button 
                onClick={onPlay}
                className="flex items-center px-4 md:px-8 py-1.5 md:py-2 bg-white text-black rounded font-bold hover:bg-opacity-80 transition text-sm md:text-base cursor-pointer"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-black" />
                Play
              </button>
              <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-400 hover:border-white transition">
                <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
              <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-400 hover:border-white transition">
                <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Details Content */}
        <div className="px-4 md:px-12 py-6 grid md:grid-cols-3 gap-6 md:gap-8 text-white">
            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-3 md:space-x-4 font-semibold text-sm md:text-base flex-wrap">
                    <span className="text-green-400">{movie.matchScore}% Match</span>
                    <span>{movie.year}</span>
                    <span className="border border-gray-500 px-1 text-xs">{movie.rating}</span>
                    <span>{movie.duration}</span>
                </div>
                <p className="text-sm md:text-lg leading-relaxed text-gray-200">
                    {movie.description}
                </p>
            </div>
            
            <div className="space-y-4 text-sm">
                <div>
                    <span className="text-gray-500">Genres:</span>
                    <div className="text-white flex flex-wrap gap-1">
                        {movie.genre.map((g, i) => (
                            <span key={i} className="hover:underline cursor-pointer">
                                {g}{i < movie.genre.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-gray-500">This movie is:</span>
                    <span className="text-white ml-1">Exciting, Suspenseful</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
