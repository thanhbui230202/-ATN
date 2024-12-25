import axios from "axios";
const API_URL = "http://localhost:5505/api/movie";
export async function getAllMovies() {
    try {
      const response = await axios.get(`${API_URL}/list`)
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error)
    }
}
export async function createMovie(nameMovie, categoryFilm,duration,movieViewingAge,releaseDate,poster,trailer,description) {
    try {
    const response = await axios.post(`${API_URL}/save`,{
        nameMovie,
        categoryFilm,
        duration,
        movieViewingAge,
        releaseDate,
        poster,
        trailer,
        description
    });
      return response.data;
    } catch (error) {
        console.log(error);
    }
}
export async function getMovieByID(movieId) {
  try {
    const response = await axios.get(`${API_URL}/${movieId}`,{
      movieId
    })
    return response.data;
  } catch (error) {
    console.log(error);
    
  }  
}
