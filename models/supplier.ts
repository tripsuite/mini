export enum SupplierType {
  HOTEL = 'HOTEL',
  AIRLINE = 'AIRLINE',
}

export interface SupplierModel {
  id: string;
  deletedAt?: Date;
  name: string;
  type: SupplierType;
}
