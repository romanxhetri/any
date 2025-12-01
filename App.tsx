
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Modal from './components/Modal';
import AddMovieModal from './components/AddMovieModal';
import Player from './components/Player';
import { MOCK_HERO_MOVIE, INITIAL_CATEGORIES } from './constants';
import { Movie, ViewState } from './types';
import { Loader2 } from 'lucide-react';

function App() {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // Custom Movies State
  const [myMovies, setMyMovies] = useState<Movie[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handlePlayMovie = (movie: Movie) => {
    setPlayingMovie(movie);
    setViewState(ViewState.PLAYER);
    setSelectedMovie(null); 
  };

  const handleAddMovie = (movie: Movie) => {
    setMyMovies(prev => [movie, ...prev]);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setViewState(ViewState.SEARCH);
    setIsSearching(true);
    setSearchResults([]); 

    // Simulate search delay for effect
    setTimeout(() => {
        // Flatten all available movies
        const allMovies = [
            MOCK_HERO_MOVIE,
            ...INITIAL_CATEGORIES.flatMap(cat => cat.movies),
            ...myMovies
        ];

        // Deduplicate by ID
        const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());

        // Filter based on query
        const results = uniqueMovies.filter(movie => {
            const lowerQuery = query.toLowerCase();
            const titleMatch = movie.title.toLowerCase().includes(lowerQuery);
            const genreMatch = movie.genre.some(g => g.toLowerCase().includes(lowerQuery));
            return titleMatch || genreMatch;
        });

        setSearchResults(results);
        setIsSearching(false);
    }, 500);
  };

  // Render Player View
  if (viewState === ViewState.PLAYER && playingMovie) {
    return (
        <Player 
            movie={playingMovie} 
            onBack={() => {
                setViewState(ViewState.HOME);
                setPlayingMovie(null);
            }} 
        />
    );
  }

  return (
    <div className="min-h-screen bg-transparent font-sans pb-10 overflow-x-hidden selection:bg-netflixRed selection:text-white antialiased text-gray-100">
      <Navbar 
        setViewState={setViewState} 
        onSearch={handleSearch} 
        onOpenAddMovie={() => setIsAddModalOpen(true)}
      />
      
      {viewState === ViewState.HOME && (
        <>
          <Hero movie={MOCK_HERO_MOVIE} onPlay={() => handlePlayMovie(MOCK_HERO_MOVIE)} />
          
          {/* Main Content Rows - Adjusted margins to prevent overlap */}
          <div className="relative z-10 -mt-16 md:-mt-40 space-y-4 md:space-y-8 pb-8 pl-4 md:pl-12 bg-transparent">
            {/* My List Row - Only shows if there are custom movies */}
            {myMovies.length > 0 && (
                <Row 
                    title="My List" 
                    movies={myMovies} 
                    onMovieClick={handleMovieClick}
                />
            )}
            
            {INITIAL_CATEGORIES.map((category) => (
              <Row 
                key={category.title} 
                title={category.title} 
                movies={category.movies} 
                onMovieClick={handleMovieClick}
              />
            ))}
          </div>
        </>
      )}

      {viewState === ViewState.SEARCH && (
        <div className="pt-24 px-4 md:px-12 min-h-screen animate-fade-in">
            <h2 className="text-xl md:text-3xl text-white mb-6 font-bold truncate">
                {isSearching ? `Searching for "${searchQuery}"...` : `Results for: "${searchQuery}"`}
            </h2>
            
            {isSearching ? (
                <div className="flex flex-col items-center justify-center h-64 text-netflixRed">
                    <Loader2 className="w-12 h-12 animate-spin mb-4" />
                    <p className="text-white text-lg font-light">Searching library...</p>
                </div>
            ) : (
                <>
                {searchResults.length > 0 ? (
                    /* Responsive Grid: 2 cols mobile, 3 tablet, 4 laptop, 5 desktop */
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {searchResults.map((movie) => (
                            <div 
                                key={movie.id} 
                                onClick={() => handleMovieClick(movie)} 
                                className="relative group cursor-pointer rounded-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl bg-[#181818]"
                            >
                                <div className="aspect-video w-full">
                                    <img 
                                        src={movie.thumbnailUrl} 
                                        alt={movie.title} 
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                    <p className="text-white text-sm font-bold truncate drop-shadow-md">{movie.title}</p>
                                    <div className="flex items-center space-x-2 text-xs mt-1">
                                        <p className="text-green-400 font-bold">{movie.matchScore}% Match</p>
                                        <p className="text-gray-300">{movie.year}</p>
                                    </div>
                                    <div className="mt-2 flex space-x-2">
                                         <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 fill-black" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                         </div>
                                         <div className="w-6 h-6 border border-gray-300 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                     </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
                        <p className="text-lg">No matches found for "{searchQuery}".</p>
                        <p className="text-sm mt-2">Try searching for genres like "Sci-Fi", "Comedy", or specific titles.</p>
                    </div>
                )}
                </>
            )}
        </div>
      )}

      {/* Footer */}
      <div className="px-4 md:px-12 mt-20 text-gray-500 text-sm pb-8 text-center border-t border-gray-800 pt-8 bg-black/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs mb-8">
            <div className="space-y-2">
                <p className="hover:underline cursor-pointer">Audio Description</p>
                <p className="hover:underline cursor-pointer">Investor Relations</p>
                <p className="hover:underline cursor-pointer">Legal Notices</p>
            </div>
            <div className="space-y-2">
                <p className="hover:underline cursor-pointer">Help Center</p>
                <p className="hover:underline cursor-pointer">Jobs</p>
                <p className="hover:underline cursor-pointer">Cookie Preferences</p>
            </div>
             <div className="space-y-2">
                <p className="hover:underline cursor-pointer">Gift Cards</p>
                <p className="hover:underline cursor-pointer">Terms of Use</p>
                <p className="hover:underline cursor-pointer">Corporate Information</p>
            </div>
             <div className="space-y-2">
                <p className="hover:underline cursor-pointer">Media Center</p>
                <p className="hover:underline cursor-pointer">Privacy</p>
                <p className="hover:underline cursor-pointer">Contact Us</p>
            </div>
        </div>
        <button className="border border-gray-500 px-4 py-1 mb-4 text-gray-400 hover:text-white text-xs">Service Code</button>
        <p className="text-xs">Created by Hari Chaulagain</p>
      </div>

      <Modal 
        movie={selectedMovie} 
        onClose={handleCloseModal} 
        onPlay={() => selectedMovie && handlePlayMovie(selectedMovie)}
      />
      
      {isAddModalOpen && (
        <AddMovieModal 
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddMovie}
        />
      )}
    </div>
  );
}

export default App;
