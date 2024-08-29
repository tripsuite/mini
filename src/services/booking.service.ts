import { Booking, Prisma } from '@prisma/client';
import prisma from 'prisma/db';

export enum SupplierType {
  HOTEL = 'HOTEL',
  AIRLINE = 'AIRLINE',
}

export default class BookingService {
  public static async createBooking(booking: Prisma.BookingCreateManyInput) {
    return prisma.booking.create({
      data: {
        ...booking,
      },
    });
  }

  public static async getBookings(tripId: string) {
    return prisma.booking.findMany({
      where: {
        tripId,
      },
    });
  }

  public static async deleteBooking(bookingId: string) {
    return prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
