import axios from "axios";
const API_URL = "http://localhost:5505/api/booked-seats";

export async function getAllBookedSeatByShowTime(showtimeId) {
    try {
        const response = await axios.get(`${API_URL}/showtime/${showtimeId}`, {
            showtimeId 
          });
          return response.data;
    } catch (error) {
      console.log(error);
    }  
}