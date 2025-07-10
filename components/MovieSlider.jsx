"use client";

import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const MovieSlider = ({ movies, children }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative px-12 my-6">
      <h2 className="text-2xl font-bold mb-4">{children}</h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 mx-3 z-10 bg-red-500 p-2 rounded-full hover:bg-gray-500"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 mx-3 z-10 bg-red-500 p-2 rounded-full hover:bg-gray-500"
      >
        <FaAngleRight />
      </button>

      <div
        ref={sliderRef}
        className="no-scrollbar flex overflow-x-scroll space-x-4 scroll-smooth overflow-y-hidden"
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="min-w-[250px] flex-shrink-0 block hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <Image
              src={`${IMAGE_BASE_URL}/w300${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={300}
              className="rounded-lg w-[250px] h-[300px] object-cover"
            />
            <p className="text-sm mt-2 truncate w-[250px] text-center">
              {movie.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
