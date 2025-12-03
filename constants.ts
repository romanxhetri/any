

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
  { 
      title: 'Trending Now', 
      movies: [
        {
            id: 'stranger-things-embed',
            title: 'Stranger Things',
            description: 'When a young boy disappears, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
            thumbnailUrl: 'https://picsum.photos/seed/strangerthings/600/400',
            embedUrl: 'https://dintezuvio.com/embed/hpow0ir439f7',
            genre: ['Sci-Fi', 'Horror', 'Drama'],
            matchScore: 99,
            year: 2016,
            rating: 'TV-14',
            duration: 'Series'
        },
        {
            id: 'predator-badlands-2025',
            title: 'Predator: Badlands',
            description: 'A new chapter in the Predator saga, set in a futuristic wasteland where survival is the only option.',
            thumbnailUrl: 'https://picsum.photos/seed/predatorbadlands/600/400',
            embedUrl: 'https://dintezuvio.com/embed/3searyff87wf',
            genre: ['Sci-Fi', 'Action'],
            matchScore: 97,
            year: 2025,
            rating: 'R',
            duration: 'Feature'
        },
        {
            id: 'last-samurai-standing',
            title: 'Last Samurai Standing',
            description: 'In a battle for honor and survival, the last warriors of a dying era face their greatest challenge yet.',
            thumbnailUrl: 'https://picsum.photos/seed/lastsamurai/600/400',
            embedUrl: 'https://dintezuvio.com/embed/0b982ger5u0n',
            genre: ['Action', 'History', 'Drama'],
            matchScore: 94,
            year: 2024,
            rating: 'TV-MA',
            duration: 'Season 1'
        },
        {
            id: 'aaryan-2025',
            title: 'Aaryan',
            description: 'An intense action thriller following a man on a quest for vengeance against a corrupt system.',
            thumbnailUrl: 'https://picsum.photos/seed/aaryan/600/400',
            embedUrl: 'https://dintezuvio.com/embed/8tqmb10ekaap',
            genre: ['Action', 'Thriller'],
            matchScore: 91,
            year: 2025,
            rating: 'NR',
            duration: 'Feature'
        },
        {
            id: 'primitive-war-2025',
            title: 'Primitive War',
            description: 'A rescue team in the Vietnam War encounters prehistoric horrors in the jungle.',
            thumbnailUrl: 'https://picsum.photos/seed/primitivewar/600/400',
            embedUrl: 'https://dintezuvio.com/embed/iyjhbog3hoqr',
            genre: ['Sci-Fi', 'Action'],
            matchScore: 98,
            year: 2025,
            rating: 'R',
            duration: 'Feature'
        },
        {
            id: 'dracula-love-tale',
            title: 'Dracula: A Love Tale',
            description: 'A fresh take on the legendary vampire story, exploring eternal love and darkness.',
            thumbnailUrl: 'https://picsum.photos/seed/draculalove/600/400',
            embedUrl: 'https://dintezuvio.com/embed/eqlwrgc8udk3',
            genre: ['Romance', 'Horror'],
            matchScore: 95,
            year: 2024,
            rating: 'TV-MA',
            duration: 'Feature'
        },
        {
            id: 'troll-1-embed',
            title: 'Troll',
            description: 'A wicked troll king in search of a mystical ring that will return him to his human form invades a San Francisco apartment complex.',
            thumbnailUrl: 'https://picsum.photos/seed/troll1/600/400',
            embedUrl: 'https://dintezuvio.com/embed/zmi9qnwhqic7',
            genre: ['Fantasy', 'Horror'],
            matchScore: 88,
            year: 1986,
            rating: 'PG-13',
            duration: '1h 22m'
        },
        {
            id: 'troll-2-embed',
            title: 'Troll 2',
            description: 'A family vacationing in a small town discovers the entire population is actually goblins in disguise who plan to eat them.',
            thumbnailUrl: 'https://picsum.photos/seed/troll2/600/400',
            embedUrl: 'https://dintezuvio.com/embed/la96qke5mit5',
            genre: ['Horror', 'Comedy'],
            matchScore: 92,
            year: 1990,
            rating: 'PG-13',
            duration: '1h 35m'
        },
        {
            id: 'pushpa-2-yt',
            title: 'Pushpa 2: The Rule',
            description: 'Pushpa 2: The Rule is an upcoming Indian Telugu-language action drama film written and directed by Sukumar.',
            thumbnailUrl: 'https://img.youtube.com/vi/uttNRhknNiY/maxresdefault.jpg',
            // Updated embed URL
            embedUrl: 'https://www.youtube-nocookie.com/embed/uttNRhknNiY?si=okxPEGJur2ueH7m3',
            genre: ['Action', 'Drama'],
            matchScore: 99,
            year: 2024,
            rating: 'UA',
            duration: 'Trailer'
        },
        ...generateMockMovies('trend', 5)
      ]
  },
  { title: 'Top Rated for You', movies: generateMockMovies('top', 8) },
  { title: 'Sci-Fi Thrillers', movies: generateMockMovies('scifi', 8) },
  { title: 'Award-Winning Dramas', movies: generateMockMovies('drama', 8) },
  { title: 'Comedies', movies: generateMockMovies('comedy', 8) },
];