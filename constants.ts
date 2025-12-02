
import { Movie, Category } from './types.ts';

// Helper to generate a consistent image URL
const getImg = (id: string, width = 600, height = 400) => `https://picsum.photos/seed/${id}/${width}/${height}`;

// Standard sample video for testing
const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
const SAMPLE_VIDEO_URL_2 = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

export const MOCK_HERO_MOVIE: Movie = {
  id: 'hero-1',
  title: 'Cyberpunk: Edgerunners',
  description: 'In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw — an edgerunner.',
  thumbnailUrl: getImg('cyberpunk', 1920, 1080),
  videoUrl: SAMPLE_VIDEO_URL,
  genre: ['Sci-Fi', 'Anime', 'Action'],
  matchScore: 98,
  year: 2022,
  rating: 'TV-MA',
  duration: '1 Season'
};

const generateMockMovies = (category: string, count: number): Movie[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${category}-${i}`,
    title: `${category} Movie ${i + 1}`,
    description: `This is a thrilling description for ${category} Movie ${i + 1}. It has action, drama, and suspense.`,
    thumbnailUrl: getImg(`${category}${i}`),
    videoUrl: i % 2 === 0 ? SAMPLE_VIDEO_URL : SAMPLE_VIDEO_URL_2,
    genre: [category, 'Drama'],
    matchScore: 85 + Math.floor(Math.random() * 15),
    year: 2020 + Math.floor(Math.random() * 4),
    rating: Math.random() > 0.5 ? 'TV-MA' : 'PG-13',
    duration: `${90 + Math.floor(Math.random() * 60)}m`
  }));
};

export const INITIAL_CATEGORIES: Category[] = [
  { title: 'Trending Now', movies: generateMockMovies('trend', 8) },
  { title: 'Top Rated for You', movies: generateMockMovies('top', 8) },
  { title: 'Sci-Fi Thrillers', movies: generateMockMovies('scifi', 8) },
  { title: 'Award-Winning Dramas', movies: generateMockMovies('drama', 8) },
  { title: 'Comedies', movies: generateMockMovies('comedy', 8) },
];
