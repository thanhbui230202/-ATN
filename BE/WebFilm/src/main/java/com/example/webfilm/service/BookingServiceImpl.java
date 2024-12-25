package com.example.webfilm.service;

import com.example.webfilm.dto.BookingDTO;
import com.example.webfilm.entity.*;
import com.example.webfilm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private VNPayServiceImpl vnPayServiceImpl;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ShowTimeRepository showTimeRepository;
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Transactional
    public BookingDTO createBooking(Booking booking) {
        User user = userRepository.findById(booking.getUser().getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Showtime showtime = showTimeRepository.findById(booking.getShowtime().getShowtimeId())
                .orElseThrow(() -> new RuntimeException("Showtime not found"));


        booking.setUser(user);
        booking.setShowtime(showtime);


        if (booking.getBookedSeats() == null || booking.getBookedSeats().isEmpty()) {
            throw new RuntimeException("No seats selected for booking");
        }


        List<BookedSeat> newBookedSeats = new ArrayList<>();
        for (BookedSeat bookedSeat : booking.getBookedSeats()) {
            Seat seat = seatRepository.findById(bookedSeat.getSeat().getSeatId())
                    .orElseThrow(() -> new RuntimeException("Seat not found"));


            BookedSeat newBookedSeat = new BookedSeat();
            newBookedSeat.setSeat(seat);
            newBookedSeat.setBooking(booking);
            newBookedSeats.add(newBookedSeat);
        }


        booking.setBookedSeats(newBookedSeats);
        booking.setPaymentStatus("STANDBY");

        Booking savedBooking = bookingRepository.save(booking);
        BigDecimal amount = savedBooking.getTotalPrice();
        Integer bookingId = savedBooking.getBookingId();
        boolean paymentSuccess = vnPayServiceImpl.verifyPayment(bookingId, amount);
        if (paymentSuccess){
            savedBooking.setPaymentStatus("PAID");
            bookingRepository.save(savedBooking);

            Payment payment = new Payment();
            payment.setBooking(savedBooking);
            payment.setPaymentMethod("VNPay");
            payment.setPaymentTime(LocalDateTime.now());
            payment.setAmount(amount);
            payment.setVnpTxnRef(UUID.randomUUID().toString());
            payment.setVnpResponseCode("00");
            payment.setVnpTransactionStatus("SUCCESS");
            paymentRepository.save(payment);

            return createBookingDTO(savedBooking);
        }else {
            throw new RuntimeException("Payment failed");
        }
    }
    private BookingDTO createBookingDTO(Booking savedBooking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setUser(savedBooking.getUser());
        bookingDTO.setShowtime(savedBooking.getShowtime());
        bookingDTO.setSeatIds(new ArrayList<>());
        for (BookedSeat bookedSeat : savedBooking.getBookedSeats()) {
            bookingDTO.getSeatIds().add(bookedSeat.getSeat().getSeatId());
        }
        bookingDTO.setTotalPrice(savedBooking.getTotalPrice());
        bookingDTO.setPaymentStatus(savedBooking.getPaymentStatus());
        bookingDTO.setBookingDate(savedBooking.getBookingDate());
        return bookingDTO;
    }
}


