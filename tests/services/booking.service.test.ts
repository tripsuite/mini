import { Booking, Prisma, Supplier, Trip } from '@prisma/client';
import BookingService, { SupplierType } from 'src/services/booking.service';
import { prisma } from 'tests/prisma';

describe('BookingService', () => {
  let trip: Trip;
  let supplier: Supplier;

  beforeEach(async () => {
    trip = await prisma.trip.create({
      data: {
        name: 'Test Trip',
      },
    });

    supplier = await prisma.supplier.create({
      data: {
        name: 'Test Supplier',
        type: SupplierType.HOTEL,
      },
    });
  });

  describe('createBooking', () => {
    it('should create a booking', async () => {
      const payload = {
        tripId: trip.id,
        supplierId: supplier.id,
        checkIn: new Date(),
        total: new Prisma.Decimal(100),
      };

      const booking = await BookingService.createBooking(payload);
      expect(booking).toMatchObject({
        ...payload,
        deletedAt: null,
      });

      await prisma.booking
        .findFirstOrThrow({
          where: { id: booking.id },
        })
        .then((result: Booking) => {
          expect(result).toMatchObject({
            ...payload,
            deletedAt: null,
          });
        });
    });
  });

  describe('getBookings', () => {
    beforeEach(async () => {
      const booking = await BookingService.createBooking({
        tripId: trip.id,
        supplierId: supplier.id,
        checkIn: new Date(),
        total: new Prisma.Decimal(100),
      });

      await BookingService.createBooking({
        tripId: trip.id,
        supplierId: supplier.id,
        checkIn: new Date(),
        total: new Prisma.Decimal(100),
      });

      await BookingService.deleteBooking(booking.id);
    });

    it('should return all bookings for a trip', async () => {});
  });
});
