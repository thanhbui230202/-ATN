import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/astoms/table";
import { Search, Plus } from "lucide-react";
import { Input } from "../../components/astoms/input";
import { Button } from "../../components/astoms/button";
import { getAllMovies, createMovie } from "../../api/MovieAPI.js";
import { getAllCategories } from "../../api/CategoryAPI.js";
type Movie = {
  movieId: number;
  nameMovie: string;
  categoryFilm: {
    categoryId: number;
    categoryName: string;
  };
  duration: string;
  movieViewingAge: string;
  releaseDate: string;
  poster: string;
  trailer: string;
  description: string;
};

export default function Films() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleAddInvoice = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<
    { categoryId: number; categoryName: string }[]
  >([]);
  const [value, setValue] = useState<number | string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget as HTMLFormElement;
    const nameMovie = form.nameMovie.value.trim();
    const categoryId = form.categoryFilm.value.trim();
    const duration = form.duration.value.trim();
    const movieViewingAge = form.movieViewingAge.value.trim();
    const releaseDate = form.releaseDate.value.trim();
    const poster = form.poster.value.trim();
    const trailer = form.trailer.value.trim();
    const description = form.description.value.trim();

    if (
      !nameMovie ||
      !description ||
      !categoryId ||
      !duration ||
      !movieViewingAge ||
      !releaseDate ||
      !poster ||
      !trailer
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const categoryFilm = { categoryId: Number(categoryId) };
      const newMovie = await createMovie({
        nameMovie,
        categoryFilm,
        duration,
        movieViewingAge,
        releaseDate,
        poster,
        trailer,
        description,
      });
      console.log("API response:", newMovie);
      if (newMovie.data) {
        console.log("Movie created successfully", newMovie.data);
      } else {
        console.error("Unexpected response structure", newMovie);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error creating movie:", error);
      setError("Failed to create movie. Please try again.");
    }
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getAllMovies();
        if (data) setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);
  const filteredMovies = movies.filter(
    (movie) =>
      movie.nameMovie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.releaseDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.movieViewingAge.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.categoryFilm.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            type="text"
            placeholder="Search movies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddInvoice}>
          <Plus className="mr-2 h-4 w-4" /> Add Movie
        </Button>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New Movie</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                id="nameMovie"
                type="text"
                placeholder="Tên phim"
                className="w-full"
                required
              />
              <select
                id="categoryFilm"
                name="categoryFilm"
                className="w-full"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                required
              >
                <option value="" disabled>
                  Chọn thể loại
                </option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </select>

              <Input
                id="duration"
                type="text"
                placeholder="Thời lượng (phút)"
                className="w-full"
                required
              />
              <Input
                id="movieViewingAge"
                type="text"
                placeholder="Độ tuổi xem phim"
                className="w-full"
                required
              />
              <Input
                id="releaseDate"
                type="date"
                placeholder="Ngày khởi chiếu"
                className="w-full"
                required
              />
              <Input
                id="poster"
                type="text"
                placeholder="Poster"
                className="w-full"
                required
              />
              <Input
                id="trailer"
                type="text"
                placeholder="Trailer"
                className="w-full"
                required
              />
              <Input
                id="description"
                type="text"
                placeholder="Mô tả"
                className="w-full"
                required
              />
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Table>
        <TableCaption>A list of your recent movies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead className="text-right">Thời lượng</TableHead>
            <TableHead className="text-right">Độ tuổi</TableHead>
            <TableHead className="text-right">Ngày phát hành</TableHead>
            <TableHead className="text-right">Thể loại</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMovies.map((movie) => (
            <TableRow key={movie.movieId}>
              <TableCell className="font-medium">{movie.movieId}</TableCell>
              <TableCell>
                {movie.nameMovie.length > 10
                  ? movie.nameMovie.substring(0, 8) + "..."
                  : movie.nameMovie}
              </TableCell>
              <TableCell>
                {movie.description.length > 50
                  ? movie.description.substring(0, 50) + "..."
                  : movie.description}
              </TableCell>
              <TableCell className="text-right">{movie.duration}</TableCell>
              <TableCell className="text-right">
                {movie.movieViewingAge}
              </TableCell>
              <TableCell className="text-right">{movie.releaseDate}</TableCell>
              <TableCell className="text-right">
                {movie.categoryFilm?.categoryName || "No category"}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button>Edit</Button>
                <Button>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
