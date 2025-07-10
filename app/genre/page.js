'use client';

import { useEffect, useState } from 'react';
import MoviesGrid from '@/components/MoviesGrid';
import { apiConfig } from '@/helpers/apiConfig';
import Pagination from '@/components/Pagination';
import Spinner from '@/components/Spinner';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_OPTIONS = apiConfig();

const fetchGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, API_OPTIONS);

    if (!res.ok) throw new Error('Failed to fetch genres');

    return res.json();
};

const fetchMoviesByGenre = async (genreId, page = 1) => {
    const res = await fetch(
        `${BASE_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`,
        API_OPTIONS
    );

    if (!res.ok) throw new Error('Failed to fetch movies');

    return res.json();
};

const Genre = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const loadGenres = async () => {
        try {
            const data = await fetchGenres();
            setGenres(data.genres);
            if (data.genres.length > 0) {
                setSelectedGenre(data.genres[0]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const loadMovies = async (genreId, pageNumber) => {
        setLoading(true);
        try {
            const data = await fetchMoviesByGenre(genreId, pageNumber);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGenres();
        document.title = 'Genres | MoviesNest';
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            loadMovies(selectedGenre.id, page);
        }
    }, [selectedGenre, page]);

    const handleGenreClick = (genre) => {
        setSelectedGenre(genre);
        setPage(1);
    };

    return (
        <>
            <div className="flex min-h-screen">
                <aside className="w-64 bg-gray-900 p-4 hidden md:block h-[calc(100vh-64px)] overflow-y-scroll sticky left-0 top-[64px] no-scrollbar text-white/95">
                    <h2 className="text-xl font-bold mb-4">Genres</h2>
                    <ul className="space-y-2">
                        {genres.map((genre) => (
                            <li
                                key={genre.id}
                                onClick={() => handleGenreClick(genre)}
                                className={`cursor-pointer p-2 rounded ${selectedGenre?.id === genre.id ? 'bg-red-600' : 'hover:bg-gray-700'
                                    }`}
                            >
                                {genre.name}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="flex-1 p-6">
                    <h1 className="text-2xl font-bold px-12">
                        {selectedGenre?.name} Movies
                    </h1>

                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <MoviesGrid movies={movies} />

                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        </>
                    )}
                </main>
            </div>
        </>
    );
};

export default Genre;
