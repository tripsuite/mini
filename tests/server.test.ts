import request from 'supertest';
import app from '../src/app';  // Import the app from your server file
import BookingService from '../src/services/booking.service';

// Mock the BookingService methods
jest.mock('../src/services/booking.service');

describe('Booking API', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks between tests
  });

  it('should return bookings for a trip', async () => {
    const mockBookings = [{ id: 1, name: 'Booking 1' }];
    (BookingService.getBookings as jest.Mock).mockResolvedValue(mockBookings);

    const response = await request(app).get('/api/trips/123/bookings');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ bookings: mockBookings });
  });

  it('should create a booking', async () => {
    const mockBooking = { id: 2, tripId: '123', name: 'New Booking' };
    (BookingService.createBooking as jest.Mock).mockResolvedValue(mockBooking);

    const response = await request(app)
      .post('/api/trips/123/bookings')
      .send({ name: 'New Booking' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ booking: mockBooking });
  });

  it('should delete a booking', async () => {
    (BookingService.deleteBooking as jest.Mock).mockResolvedValue({});

    const response = await request(app).delete('/api/bookings/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });
  });
});