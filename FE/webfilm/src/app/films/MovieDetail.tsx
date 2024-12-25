import React, { useEffect, useState } from 'react';
import {getMovieByID} from '../../api/MovieAPI.js'
import { useNavigate, useParams } from 'react-router';
import {getShowtimeAndCinema} from '../../api/ShowtimeAPI.js'
interface MovieDetail {
  movieId: number;
  nameMovie: string;
  categoryFilm: number;
  categoryName: string;
  description: string;
  poster: string;
  duration: string;
  movieViewingAge: string;
  releaseDate: string;
}
interface ShowtimeDetail { 
  showtimeId: number;
  movieId: number;
  cinemaId: number;
  cinemaName: string;
  cinemaLocation: string;
  showDate: string;
  showTime: string;
}
const MovieDetails = () => {
  const [expandedTheater, setExpandedTheater] = useState(null);
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showtime, setShowtime] = useState<ShowtimeDetail[]>([]);
  const navigate = useNavigate();
  const handleShowtimeClick = (showtime: ShowtimeDetail) => {
    if (showtime.showtimeId) {
      navigate(`/seat/${showtime.showtimeId}`, { state: { movie, showtime } });
    } else {
      console.error("showtimeId is missing");
    }
  };
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        if (movieId) {
          // Convert movieId from string to number and fetch data
          const movieData = await getMovieByID(Number(movieId));
          setMovie(movieData);
        } else {
          setError('Movie ID is missing from the URL.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        if (movieId) {
          // Convert movieId from string to number and fetch data
          const showtimeData = await getShowtimeAndCinema(Number(movieId));
          setShowtime(showtimeData);
        } else {
          setError('Movie ID is missing from the URL.');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie found.</div>;
  }
  const toggleTheater = (index) => {
    setExpandedTheater(expandedTheater === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* Movie Card */}
      <div className="flex flex-col md:flex-row gap-6 bg-gray-100 rounded-lg p-6 shadow-lg mb-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full md:w-72">
          <img
            src={movie.poster}
            alt={movie.nameMovie}
            className="w-full rounded-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{movie.nameMovie}</h1>
            <span className="bg-gray-300 text-sm px-2 py-1 rounded">T{movie.movieViewingAge}</span>
          </div>
          <p className="text-gray-600 mb-4">{movie.categoryFilm.categoryName}</p>

          <div className="text-sm mb-4">
            <p>
              <strong>Thời lượng:</strong> {movie.duration}m
            </p>
            <p>
              <strong>Ngày chiếu:</strong> {movie.releaseDate}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Nội dung phim</h2>
            <p className="text-gray-700 leading-relaxed">
              {movie.description}
            </p>
          </div>
        </div>
      </div>

      {/* Showtimes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lịch Chiếu</h2>
        {showtime.map((showtime, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Theater Header */}
            <div
              className="bg-gray-200 p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleTheater(index)}
            >
              <div>
                <h3 className="text-lg font-semibold">{showtime.cinemaName}</h3>
                <p className="text-sm text-gray-600">{showtime.cinemaLocation}</p>
              </div>
              <span className="text-gray-500">
                {expandedTheater === index ? "▲" : "▼"}
              </span>
            </div>
            {/* Showtimes Schedule */}
            {expandedTheater === index && (
              <div className="p-4 bg-white">
                <h4 className="text-md font-medium mb-2">{showtime.showDate}</h4>
                <div className="flex flex-wrap gap-2">
                  <button  onClick={() => handleShowtimeClick(showtime)}
                    className="bg-gray-100 border border-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-200 transition">
                    {showtime.showTime}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
