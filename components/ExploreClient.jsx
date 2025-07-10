"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiConfig } from "@/helpers/apiConfig";
import { RiMovie2AiFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import MoviesGrid from "./MoviesGrid";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Head from "next/head";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_OPTIONS = apiConfig();

const fetchLatestMovies = async (page = 1, query = "") => {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `/movie/now_playing?page=${page}`;

  const response = await fetch(
    `${BASE_URL}${endpoint}&language=en-US`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};

const ExploreClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchLatestMovies(page, query);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [page, query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    router.push(`/explore?query=${query}&page=1`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/explore?query=${query}&page=${newPage}`);
  };

  return (
    <>
      <Head>
        <title>Explore | MoviesNest</title>
      </Head>
      <section className="px-4 py-8">
        <form onSubmit={handleSearch} className="mb-6 max-w-md mx-auto">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 pl-10 rounded-lg bg-gray-800 placeholder-gray-400 border border-gray-600"
            />
          </div>
        </form>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <MoviesGrid movies={movies}>
              <RiMovie2AiFill className="inline-block mr-2 text-red-500" />
              {query ? `Search results for "${query}"` : "Latest Movies"}
            </MoviesGrid>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </>
  );
};

export default ExploreClient;
