

import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Movie } from '../types.ts';

interface PlayerProps {
  movie: Movie;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ movie, onBack }) => {
  const isYouTube = movie.embedUrl && (
    movie.embedUrl.includes('youtube.com') || 
    movie.embedUrl.includes('youtu.be') || 
    movie.embedUrl.includes('youtube-nocookie.com')
  );
  
  const referrerPolicy = isYouTube ? "strict-origin-when-cross-origin" : "no-referrer";
  
  const openInNewTab = () => {
    if (movie.embedUrl) window.open(movie.embedUrl, '_blank');
    else if (movie.videoUrl) window.open(movie.videoUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full p-4 md:p-8 z-50 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent transition-opacity hover:opacity-100 pointer-events-none">
        <button 
          onClick={onBack}
          className="flex items-center text-white cursor-pointer hover:text-gray-300 transition pointer-events-auto"
        >
          <ArrowLeft className="w-8 h-8 md:w-10 md:h-10 mr-4" />
          <span className="text-lg md:text-xl font-bold">Back to Browse</span>
        </button>

        <button 
          onClick={openInNewTab}
          className="flex items-center bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded pointer-events-auto backdrop-blur-sm border border-white/20 transition"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          <span className="text-sm font-semibold">Open in New Tab</span>
        </button>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-black">
        {movie.embedUrl ? (
             <iframe
                src={movie.embedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; presentation"
                allowFullScreen
                referrerPolicy={referrerPolicy}
                title={movie.title}
             ></iframe>
        ) : movie.videoUrl ? (
             <video 
                controls 
                autoPlay 
                className="w-full h-full max-h-screen object-contain focus:outline-none"
                src={movie.videoUrl}
             >
                Your browser does not support the video tag.
             </video>
        ) : (
            <div className="text-center px-4">
                <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">No Video Source Available</h2>
                <p className="text-gray-400">The video URL for "{movie.title}" is missing or invalid.</p>
                <button onClick={onBack} className="mt-8 px-6 py-2 bg-white text-black font-bold rounded cursor-pointer">
                    Go Back
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Player;