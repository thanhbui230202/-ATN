import axios from "axios";
const API_URL = "http://localhost:5505/api/showtime";
export async function getShowtimeAndCinema(movieId) {
    try {
      const response = await axios.get(`${API_URL}/movie/${movieId}`,{
        movieId
      })
      return response.data;
    } catch (error) {
      console.log(error);
      
    }  
  }
