'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { apiConfig } from '@/helpers/apiConfig';
import Image from 'next/image';
import Spinner from '@/components/Spinner';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const API_OPTIONS = apiConfig();

const getMovieDetails = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos,credits&language=en-US`, API_OPTIONS);
    if (!res.ok) throw new Error('Failed to fetch movie details');
    return res.json();
};

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const castRef = useRef(null);

    useEffect(() => {
        if (!movieId) return;

        getMovieDetails(movieId)
            .then((data) => {
                setMovie(data);
                document.title = `${data.title} | MoviesNest`;
            })
            .finally(() => setLoading(false));

    }, [movieId]);

    if (loading || !movie)
        return <Spinner />;

    const trailer = movie.videos?.results?.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );
    const cast = movie.credits?.cast?.slice(0, 10);

    const scroll = (direction) => {
        if (!castRef.current) return;
        const scrollAmount = direction === 'left' ? -300 : 300;
        castRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <>
            <section className="px-4 py-8 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/3 relative min-h-[400px]">
                        <Image
                            src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                            alt={movie.title}
                            fill
                            className="rounded-lg object-cover"
                            sizes="(min-width: 768px) 33vw, 100vw"
                        />
                    </div>

                    <div className="flex-1 w-full md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4 text-center md:text-left">{movie.title}</h1>
                        <p className="text-gray-400 mb-4">{movie.overview}</p>
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                            Release Date: {movie.release_date} | <span className='flex gap-2'>Rating: {movie.vote_average} <FaStar /></span>
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                            Genres: {movie.genres.map((genre) => genre.name).join(', ')}
                        </p>

                        {cast?.length > 0 && (
                            <div className="mt-6 relative">
                                <h2 className="text-xl font-semibold mb-2">Top Cast</h2>
                                <div className="relative">
                                    <button
                                        onClick={() => scroll('left')}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-red-500 rounded-full hover:bg-black/80 hidden sm:flex"
                                    >
                                        <FaAngleLeft />
                                    </button>
                                    <button
                                        onClick={() => scroll('right')}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-red-500 rounded-full hover:bg-black/80 hidden sm:flex"
                                    >
                                        <FaAngleRight />
                                    </button>

                                    <div
                                        ref={castRef}
                                        className="flex gap-4 overflow-x-auto  no-scrollbar scroll-smooth"
                                    >
                                        {cast.map((actor) => (
                                            <div
                                                key={actor.id}
                                                className="min-w-[100px] flex-shrink-0 text-center relative"
                                            >
                                                <div className="relative w-[180px] h-[220px] mx-auto">
                                                    <Image
                                                        src={
                                                            actor.profile_path
                                                                ? `${IMAGE_BASE_URL}/w185${actor.profile_path}`
                                                                : '/placeholder-profile.svg'
                                                        }
                                                        alt={actor.name}
                                                        fill
                                                        className="rounded-lg object-cover"
                                                        sizes="100px"
                                                    />
                                                </div>
                                                <p className="text-sm mt-2">{actor.name}</p>
                                                <p className="text-xs text-gray-500">{actor.character}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {trailer && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">Watch Trailer</h2>
                        <div className="aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${trailer.key}`}
                                className="w-full h-full rounded-lg"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default MovieDetailPage;
