const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const apiConfig = () => {
    return {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    };
}