import { OrderingDomainModel } from './ordering-domain-model';
export class GuestFactory {
  static create(data?: Partial<OrderingDomainModel.Guest>): OrderingDomainModel.Guest {
    return {
      id: '',
      firstName: "",
      lastName: "",
      age: 18,
      ...data
    };
  }
}