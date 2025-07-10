import Link from "next/link";
import { apiConfig } from "@/helpers/apiConfig";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const API_OPTIONS = apiConfig();

const getRandomMovie = async () => {
  const options = {
    ...API_OPTIONS,
    cache: "no-store",
  };

  const countRes = await fetch(
    `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&page=1`,
    options
  );

  if (!countRes.ok) throw new Error("Failed to fetch movie pages");

  const { total_pages } = await countRes.json();
  const randomPage = Math.floor(Math.random() * Math.min(total_pages, 500)) + 1;

  const movieRes = await fetch(
    `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&page=${randomPage}`,
    options
  );

  if (!movieRes.ok) throw new Error("Failed to fetch random page");

  const pageData = await movieRes.json();
  const randomIndex = Math.floor(Math.random() * pageData.results.length);

  return pageData.results[randomIndex];
};

const MainMovie = async () => {
  const movie = await getRandomMovie();
  const backgroundImage = `${IMAGE_BASE_URL}/original${movie.backdrop_path}`;

  return (
    <section
      className="relative h-[80vh] w-full bg-cover bg-center flex items-center justify-start px-6 lg:px-16 text-white/95"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-sm md:text-base mb-6 line-clamp-4">
          {movie.overview}
        </p>

        <div className="flex space-x-4">
          <Link
            href={`/movie/${movie.id}`}
            className="bg-white text-black hover:bg-gray-300 transition px-6 py-2 rounded font-semibold"
          >
            More Info
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainMovie;
