import React, { useEffect, useState } from 'react';
import SeatGrid from './SeatGrid';
import SeatLegend from './SeatLegend';
import BookingSummary from './BookingSummary';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const PRICE_PER_TICKET = 6500;

export default function App() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const { showtimeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, showtime } = location.state || {};
  const showtimeIdFromState = showtime?.showtimeId;
  useEffect(() => {
    if (!movie || !showtime) {
      navigate('/');  // Redirect to home or an error page if data is missing
    }
  }, [movie, showtime, navigate]);
  console.log('Showtime ID:', showtimeIdFromState);
  
  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Movie Ticket Booking</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Hãy chọn ghế ngồi</h2>
          <SeatGrid selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
          <SeatLegend />
          <div className="mt-8">
            <BookingSummary
              selectedSeats={selectedSeats} 
              pricePerTicket={PRICE_PER_TICKET} 
              showtimeId={showtimeIdFromState}
            />
          </div>
        </div>
      </div>
    </div>
     
  );
}

