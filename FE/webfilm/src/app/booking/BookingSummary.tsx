import React, { useEffect, useState } from 'react';
import { createBooking } from '../../api/BookingAPI.js';
import { useNavigate } from 'react-router';
import { cn } from '../../lib/utils.js';


interface BookingSummaryProps {
  selectedSeats: string[];
  pricePerTicket: number;
  showtimeId: number;
}

export default function BookingSummary({
  selectedSeats,
  pricePerTicket,
  showtimeId,
}: BookingSummaryProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  

  function decodeJWT(token: string) {
    const payload = token.split('.')[1]; 
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken.userId) {
        setUserId(decodedToken.userId);
      } else {
        console.error('User ID not found in token');
        alert('Invalid token');
        navigate("/login");
      }
    } else {
      console.error('User not logged in');
      alert('You need to log in first!');
      navigate("/login");
    }
  }, [navigate]);

  

  const totalPrice = selectedSeats.length * pricePerTicket;

  const handleBooking = async () => {
    if (!userId) {
      alert('User not logged in');
      return;
    }
    const bookedSeats = selectedSeats.map((seat) => ({
      seat: { seatId: parseInt(seat) }  
    }));
    const bookingDetails = {
      user: { userId }, 
      showtime: { showtimeId },
      totalPrice,
      paymentStatus: 'PAID',
      bookedSeats,
    };   
    try {
      await createBooking(bookingDetails);
      alert('Booking Successful');
      navigate("/")
    } catch (error) {
      alert('Booking Failed');
      console.error(error);
    }
  };
  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
      <p className="mb-4">Tổng tiền: {totalPrice.toFixed(2)} VND</p>
      <button 
        className={cn("w-full py-2 px-4 rounded" ,selectedSeats.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600')}
        disabled={selectedSeats.length === 0}
        onClick={handleBooking} 
      >
        Đặt vé
      </button>
    </div>
  );
}