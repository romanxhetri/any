
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Movie } from '../types.ts';

interface AddMovieModalProps {
  onClose: () => void;
  onAdd: (movie: Movie) => void;
}

const AddMovieModal: React.FC<AddMovieModalProps> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    embedUrl: '',
    genre: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // SMART EXTRACTION: If user pasted a full <iframe src="..."> code, extract just the URL
    let finalEmbedUrl = formData.embedUrl;
    // Regex handles src="...", src='...', or even unquoted src=...
    const iframeMatch = finalEmbedUrl.match(/src=["']?([^"'\s>]+)["']?/i);
    if (iframeMatch) {
      finalEmbedUrl = iframeMatch[1];
    }

    const newMovie: Movie = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl || `https://picsum.photos/seed/${formData.title.replace(/\s+/g, '')}/600/400`,
      videoUrl: formData.videoUrl, 
      embedUrl: finalEmbedUrl, // Save the extracted or raw custom embed URL
      genre: formData.genre.split(',').map(g => g.trim()).filter(g => g),
      matchScore: 98,
      year: new Date().getFullYear(),
      rating: 'NR',
      duration: 'Unknown'
    };
    onAdd(newMovie);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose}
      ></div>
      <div className="bg-[#181818] w-full max-w-lg rounded-lg p-6 relative z-10 shadow-2xl border border-gray-800 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
            <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-white">Add Movie to My List</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-400 text-sm mb-1">Title</label>
                <input 
                    type="text" 
                    required
                    className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444]"
                    placeholder="Movie Title"
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                />
            </div>
            
            <div>
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea 
                    required
                    className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444] h-20 resize-none"
                    placeholder="Plot summary..."
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-1">Thumbnail Image URL</label>
                <input 
                    type="url" 
                    className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444]"
                    placeholder="https://example.com/image.jpg"
                    value={formData.thumbnailUrl}
                    onChange={e => setFormData({...formData, thumbnailUrl: e.target.value})}
                />
            </div>

            <div className="border-t border-gray-700 pt-4 mt-2">
                <p className="text-white font-bold mb-2">Video Source (Choose one)</p>
                
                <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-1">Option A: Embed Code / URL</label>
                    <input 
                        type="text" 
                        className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444]"
                        placeholder="Paste Link or <iframe src=...>"
                        value={formData.embedUrl}
                        onChange={e => setFormData({...formData, embedUrl: e.target.value})}
                    />
                    <p className="text-xs text-gray-500 mt-1">Works with YouTube embeds or streaming iframe URLs.</p>
                </div>

                <div>
                    <label className="block text-gray-400 text-sm mb-1">Option B: Direct Video File (MP4)</label>
                    <input 
                        type="url" 
                        className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444]"
                        placeholder="https://.../video.mp4"
                        value={formData.videoUrl}
                        onChange={e => setFormData({...formData, videoUrl: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-400 text-sm mb-1">Genres (comma separated)</label>
                <input 
                    type="text" 
                    className="w-full bg-[#333] rounded px-4 py-2 text-white focus:outline-none focus:bg-[#444]"
                    placeholder="Action, Sci-Fi, Drama"
                    value={formData.genre}
                    onChange={e => setFormData({...formData, genre: e.target.value})}
                />
            </div>

            <button 
                type="submit"
                className="w-full bg-netflixRed hover:bg-red-700 text-white font-bold py-3 rounded mt-2 transition"
            >
                Add to My List
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
