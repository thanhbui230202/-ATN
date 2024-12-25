import axios from "axios";
const API_URL = "http://localhost:5505/api/booking";   
export async function createBooking (bookingDetails){
    try {
      const response = await axios.post(`${API_URL}/create`, bookingDetails,{
        headers: {
            "Content-Type": "application/json",
        },
      }
    );
      console.log('Booking Successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Booking Failed:', error.response.data);
      throw error;
    }
};