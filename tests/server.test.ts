import request from 'supertest';
import app from '../src/app'; // Import the app from your server file
import BookingService, { SupplierType } from '../src/services/booking.service';
import { Prisma, Trip } from '@prisma/client';
import { prisma } from './prisma';

// Mock the BookingService methods
jest.mock('../src/services/booking.service');

describe('Booking API', () => {
  let trip: Trip;
  beforeEach(async () => {
    trip = await prisma.trip.create({
      data: {
        name: 'Test Trip',
      },
    });

    jest.clearAllMocks(); // Clear all mocks between tests
  });

  it('should return bookings for a trip', async () => {
    const mockBookings = [{ id: 1, name: 'Booking 1' }];
    (BookingService.getBookings as jest.Mock).mockResolvedValue(mockBookings);

    const response = await request(app).get(`/api/trips/${trip.id}/bookings`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ bookings: mockBookings });
  });

  it('should create a booking', async () => {
    const mockBooking = { id: 2, tripId: '123', name: 'New Booking' };
    (BookingService.createBooking as jest.Mock).mockResolvedValue(mockBooking);

    const response = await request(app)
      .post(`/api/trips/${trip.id}/bookings`)
      .send({ name: 'New Booking' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ booking: mockBooking });
  });

  it('should delete a booking', async () => {
    const supplier = await prisma.supplier.create({
      data: {
        name: 'Test Supplier',
        type: SupplierType.HOTEL,
      },
    });

    const booking = await BookingService.createBooking({
      tripId: trip.id,
      supplierId: supplier.id,
      total: new Prisma.Decimal(100),
      checkIn: new Date(),
    });

    (BookingService.deleteBooking as jest.Mock).mockResolvedValue({});

    const response = await request(app).delete(`/api/bookings/${booking.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Deleted' });

    // TODO: let's call our getBooking endpoint to make sure the booking was deleted with an expect
  });
});
