import movies from "@/data/movies.json";

export async function GET() {
    return new Response(JSON.stringify(movies), { status: 200 });
}

export async function POST(request) {
    const data = await request.json();
    const movie = { id: movies.length + 1, ...data };
    movies.push(movie);
    return new Response(JSON.stringify(movie), { status: 200 });
}