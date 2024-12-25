import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
import { Button } from '../astoms/button.js';
import { Dialog, DialogContent } from '../astoms/dialog.js';
import { getAllMovies } from '../../api/MovieAPI.js';
import { useNavigate } from 'react-router';
import {TopNav} from './Header.js';

interface Movie {
  movieId: number;
  nameMovie: string;
  poster: string;
  trailer: string;
}

export default function BackGround() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");
  const [currentBackground, setCurrentBackground] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        if (data) {
          setMovies(data);
          if (data.length > 0) {
            setCurrentBackground(data[0].poster);
            setCurrentTitle(data[0].nameMovie);
          }
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const openTrailer = (trailerCode: string) => {
    if (trailerCode) {
      setCurrentTrailer(`https://www.youtube.com/embed/${trailerCode}`);
      setIsTrailerOpen(true);
    }
  };

  const changeBackground = (movie: Movie) => {
    setCurrentBackground(movie.poster);
    setCurrentTitle(movie.nameMovie);
  };

  if (!movies.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        {/* Background container */}
        <div className="absolute inset-0">
          <div className="h-full w-full overflow-hidden">
            <img
              src={currentBackground || "/path/to/fallback-image.jpg"}
              alt="Hero background"
              className="h-full w-full object-cover transition-opacity duration-500 ease-in-out"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>
      </div>
  
      {/* Movie Carousel */}
      <div className="relative px-4 py-8">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div
              key={movie.movieId}
              className="relative flex-shrink-0 w-[200px] h-[300px] cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
              onClick={() => changeBackground(movie)}
            >
              {/* Image Container */}
              <img
                src={movie.poster || "/path/to/fallback-image.jpg"}
                alt={movie.nameMovie}
                className="h-full w-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  openTrailer(movie.trailer); // Pass the trailer code
                }}
              >
                <Play className="h-8 w-8" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
        <DialogContent className="sm:max-w-[720px]">
          <iframe
            width="100%"
            height="405"
            src={currentTrailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );  
}
