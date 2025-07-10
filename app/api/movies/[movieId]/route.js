import movies from "@/data/movies.json";

export async function GET(_, { params }) {
    const { movieId } = await params;
    const movie = movies.find((movie) => movie.id === parseInt(movieId));
    return new Response(JSON.stringify(movie), { status: 200 });
}

export async function DELETE(_, { params }) {
    const { movieId } = await params;
    movies = movies.filter((movie) => movie.id !== parseInt(movieId));
    return new Response(JSON.stringify({ message: 'Movie deleted successfully' }), { status: 200 });
}

export async function PUT(request, { params }) {
    const { movieId } = await params;
    const data = await request.json();
    let updatedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    updatedMovie = { ...updatedMovie, ...data };
    movies = movies.map((movie) => movie.id === parseInt(movieId) ? updatedMovie : movie);
    return new Response(JSON.stringify(updatedMovie), { status: 200 });
}