export interface BookingModel {
  id: string;
  deletedAt?: Date;
  tripId: string;
  supplierId: string;
  checkIn: Date;
  total: number;
}
