'use client';

import { useEffect, useState } from "react";

const Page = ({ params }) => {
    const { movieId } = params;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const res = await fetch(`/api/movies/${movieId}`);
            if (!res.ok) throw new Error('Failed to fetch movie details');
            setMovie(await res.json());
        };
        fetchMovieDetails().catch(console.error);
    }, [movieId]);
    return (
        <>
            <div>
                {movieId ? movieId : 'Loading...'}
            </div>
            {
                movie && (
                    <div>
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                        <p>{movie.rating}</p>
                    </div>
                )
            }
        </>
    );
}

export default Page;
