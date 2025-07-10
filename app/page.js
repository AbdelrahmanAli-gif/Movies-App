import { FaFire, FaStar } from "react-icons/fa";
import { apiConfig } from '@/helpers/apiConfig';
import MainMovie from '@/components/MainMovie';
import MoviesGrid from '@/components/MoviesGrid';
import MovieSlider from '@/components/MovieSlider';

export const metadata = {
  title: 'Home | MoviesNest',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_OPTIONS = apiConfig();

const getTrending = async () => {
  const options = {
    ...API_OPTIONS,
    next: { revalidate: 3600 },
    cache: 'force-cache',
  };

  const response = await fetch(`${BASE_URL}/movie/upcoming?language=en-US&page=1`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

const getTopRated = async () => {
  const options = {
    ...API_OPTIONS,
    next: { revalidate: 3600 },
    cache: 'force-cache',
  };

  const response = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, options);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

const Home = async () => {
  const [trendingMovies, topRatedMovies] = await Promise.all([
    getTrending(),
    getTopRated()
  ]);

  return (
    <div>
      <MainMovie />
      <MovieSlider movies={trendingMovies.results}>
        <div className="flex items-center gap-2">
          <FaFire className="text-red-500" />
          Trending Movies
        </div>
      </MovieSlider>
      <MoviesGrid movies={topRatedMovies.results}>
        <div className="flex items-center gap-2">
          <FaStar className="text-red-500" />
          Top Rated Movies
        </div>
      </MoviesGrid>
    </div>
  );
}

export default Home;
