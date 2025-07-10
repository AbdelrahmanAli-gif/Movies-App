'use client';

import { useEffect, useState } from "react";

const Page = () => {
    const [movies, setMovies] = useState([]);
    const [inputState, setInputState] = useState({});
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            const response = await fetch('/api/movies');
            const data = await response.json();
            setMovies(data);
        }

        fetchMovies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputState, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputState),
        });
        const data = await response.json();
        setMovies([...movies, data]);
        setInputState({});
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const response = await fetch(`/api/movies/${inputState.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputState),
        });
        const data = await response.json();
        setMovies(movies.map((movie) => movie.id === inputState.id ? data : movie));
        setUpdating(false);
        setInputState({});
    }

    const handleDelete = async (id) => {
        const response = await fetch(`/api/movies/${id}`, {
            method: 'DELETE',
        });
        await response.json();
        setMovies(movies.filter((movie) => movie.id !== id));
    }

    return (
        <div>
            <h1>API Calls</h1>
            <form onSubmit={updating ? handleUpdate : handleSubmit}>
                <input type="text" name="title" value={inputState.title || ''} onChange={handleChange} placeholder="Movie Name" className="border border-gray-400" />
                <br />
                <input type="number" name="year" value={inputState.year || ''} onChange={handleChange} placeholder="Movie Year" className="border border-gray-400" />
                <br />
                <input type="number" name="rating" value={inputState.rating || ''} onChange={handleChange} placeholder="Movie Rating" className="border border-gray-400" />
                <br />
                <button type="submit" className="bg-green-500 rounded py-2 px-2">{updating ? 'Update' : 'Add'}</button>
            </form>
            {movies.map((movie) => (
                <div key={movie.id} className="border border-gray-400 w-1/4 mb-4" >
                    <h2>Title: {movie.title}</h2>
                    <p>Year: {movie.year}</p>
                    <p>Rating: {movie.rating}</p>
                    <div className="flex gap-2">
                        <button onClick={() => handleDelete(movie.id)} className="bg-red-500 rounded py-2 px-2" >Delete</button>
                        <button onClick={() => { setInputState(movie); setUpdating(true); }} className="bg-blue-500 rounded py-2 px-2">Update</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Page;
