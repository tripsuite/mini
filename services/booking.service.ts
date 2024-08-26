import prisma from 'prisma/db';
import { BookingModel } from 'models/booking';

export default class BookingService {
  public static async createBooking(booking: Omit<BookingModel, 'id'>) {
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
