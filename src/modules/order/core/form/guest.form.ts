import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";

export class GuestForm {
  addGuest(guests: OrderingDomainModel.Guest[]) {
    return [{
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 0
    }];
  }
}