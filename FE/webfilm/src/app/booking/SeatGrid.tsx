import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  
import { getAllSeatByShowTime } from '../../api/SeatAPI.js'; // Ensure you have the correct path for the API function
import {getAllBookedSeatByShowTime} from '../../api/SeatBookedAPI.js';
interface SeatGridProps {
  showtimeId: number;
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export default function SeatGrid({ selectedSeats, onSeatSelect }: SeatGridProps) {
  const { showtimeId } = useParams();
  const [seats, setSeats] = useState<any[]>([]);
  const [reservedSeats, setReservedSeats] = useState<string[]>([]);
  useEffect(() => {
    if (!showtimeId) {
      console.error('Showtime ID is missing!');
      return;
    }

    // Fetch seats data for the given showtimeId
    const fetchSeats = async () => {
      try {
        const [seatData, bookedSeatData] = await Promise.all([
          getAllSeatByShowTime(parseInt(showtimeId, 10)),
          getAllBookedSeatByShowTime(parseInt(showtimeId, 10)),
        ]);

        setSeats(seatData);
        const reserved = bookedSeatData.map((booked: any) => booked.seat.seatNumber);
        setReservedSeats(reserved);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };
    fetchSeats();
  }, [showtimeId]);

  const renderSeat = (seat: any) => {
    const seatId = seat.seatId;
    const isSelected = selectedSeats.includes(seatId.toString());
    const isReserved = reservedSeats.includes(seat.seatNumber);

    return (
      <button
        key={seat.seatId}
        className={`w-10 h-10 m-1 rounded ${isReserved ? 'bg-gray-500 cursor-not-allowed' : isSelected ? 'bg-blue-500 text-white' : 'bg-white border border-gray-300 hover:bg-blue-100'}`}
        onClick={() => !isReserved && onSeatSelect(seatId.toString())}
        disabled={isReserved}
      >
        {seat.seatNumber}
      </button>
    );
  };

  const groupSeatsByRow = (seats: any[]) => {
    if (!seats || seats.length === 0) return {};
    return seats.reduce((groups: any, seat: any) => {
      const row = seat.seatNumber.charAt(0);
      if (!groups[row]) groups[row] = [];
      groups[row].push(seat);
      return groups;
    }, {});
  };

  const groupedSeats = groupSeatsByRow(seats);

  const renderRow = (rowSeats: any[]) => (
    <div key={rowSeats[0]?.seatNumber} className="flex justify-center mb-2">
      {rowSeats.map((seat) => renderSeat(seat))}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 text-center">
        <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
        <p className="text-sm text-gray-500">Màn hình</p>
      </div>
      {Object.keys(groupedSeats).map((row) => renderRow(groupedSeats[row]))}
    </div>
  );
}
