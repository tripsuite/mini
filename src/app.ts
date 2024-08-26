import express, { Request, Response } from 'express';
import BookingService from './services/booking.service';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET route
app.get('/api/trips/:tripId/bookings', async (req: Request, res: Response) => {
  const { tripId } = req.params;
  const bookings = await BookingService.getBookings(tripId);
  res.send({ bookings });
});

// POST route
app.post('/api/trips/:tripId/bookings', async (req: Request, res: Response) => {
  const { tripId } = req.params;
  req.body.tripId = tripId;
  const booking = await BookingService.createBooking(req.body);
  res.send({ booking });
});

// DELETE route
app.delete('/api/bookings/:bookingId', async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const booking = await BookingService.deleteBooking(bookingId);
  res.send({ message: 'Deleted' });
});

// Export the app for testing
export default app;