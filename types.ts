
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string; // For direct MP4 files
  embedUrl?: string; // For iframe embeds (YouTube, Streaming APIs)
  imdbId?: string;
  genre: string[];
  matchScore: number;
  year: number;
  rating: string;
  duration: string;
}

export interface Category {
  title: string;
  movies: Movie[];
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PLAYER = 'PLAYER'
}
