"use client";

import Image from "next/image";
import Link from "next/link";

const MoviesGrid = ({ movies, children }) => {
  return (
    <section className="py-2 px-12 my-2">
      <h2 className="text-2xl font-bold mb-6">{children}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group hover:scale-[1.03] transition-transform"
          >
            <div className="w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md relative">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover group-hover:brightness-90 transition duration-300"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium truncate w-full text-center">
              {movie.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MoviesGrid;
