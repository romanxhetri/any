
import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard.tsx';
import { Movie } from '../types.ts';

interface RowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const Row: React.FC<RowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const slide = (offset: number) => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (rowRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [movies]);

  return (
    <div className="space-y-2 py-2 md:py-4 relative group z-10">
      <h2 className="text-white text-lg md:text-2xl font-bold hover:text-gray-300 transition cursor-pointer mb-2 inline-block px-2 md:px-0">
        {title}
      </h2>
      
      <div className="relative group/row">
        {showLeftArrow && (
            <ChevronLeft 
            className="absolute left-0 top-0 bottom-0 z-40 m-auto w-12 h-full bg-black/50 hover:bg-black/70 cursor-pointer text-white hidden md:block opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 p-2" 
            onClick={() => slide(-600)}
            />
        )}
        
        {/* Scroll Container */}
        <div 
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-start space-x-3 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-2 md:px-0 scroll-snap-x snap-mandatory pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="snap-start">
                <MovieCard movie={movie} onClick={onMovieClick} />
            </div>
          ))}
        </div>

        {showRightArrow && (
            <ChevronRight 
            className="absolute right-0 top-0 bottom-0 z-40 m-auto w-12 h-full bg-black/50 hover:bg-black/70 cursor-pointer text-white hidden md:block opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 p-2"
            onClick={() => slide(600)}
            />
        )}
      </div>
    </div>
  );
};

export default Row;
