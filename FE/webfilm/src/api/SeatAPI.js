import axios from "axios";
const API_URL = "http://localhost:5505/api/seats";
export async function getAllSeatByShowTime(showtimeId) {
    try {
        const response = await axios.get(`${API_URL}/screening/${showtimeId}`, {
            showtimeId 
          });
          return response.data;
    } catch (error) {
      console.log(error);
    }  
}
