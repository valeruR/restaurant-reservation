import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}

  addGuest(guests: OrderingDomainModel.Guest[]) {
    return [
      ...guests,
      {
      id: this.idProvider.generate(),
      firstName: "John",
      lastName: "Doe",
      age: 0
    }];
  }

  removeGuest(guests: OrderingDomainModel.Guest[], id: string) {
    return guests.filter(guest => guest.id !== id);
  }
}