import { useEffect, useState } from "react";
import { Card, CardContent } from "../astoms/card";
import { getAllMovies } from '../../api/MovieAPI'; 
import { useNavigate } from "react-router";

interface MediaItem {
  id : number;
  title: string;
  image: string;
  rating: string;
  duration?: string;
}

export default function CardMovie() {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        console.log("Fetched Movies:", response);
        if (response) {
          const formattedMovies = response.map((movie: any) => ({
            id: movie.movieId,
            title: movie.nameMovie,
            image: movie.poster,
            rating: `${movie.movieViewingAge}+`,
            duration: `${movie.duration}m`
          }));
          setMovies(formattedMovies);
        } else {
          setError("No movies available.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const handleCardClick = (movieId: number) => {
    navigate(`/detail/${movieId}`);
  };
  return (
    <main className="min-h-screen bg-black p-6 md:px-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-semibold text-white">Coming soon</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {movies.map((item, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-zinc-900 transition-all hover:scale-105"
              onClick={() => handleCardClick(item.id)}>
              <CardContent className="p-0">
                <div className="relative aspect-[2/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4">
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-300">
                      <span className="rounded bg-gray-700 px-1.5 py-0.5">{item.rating}</span>
                      {item.duration && <span>{item.duration}</span>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
