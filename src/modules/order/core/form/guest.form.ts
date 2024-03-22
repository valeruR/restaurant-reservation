import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";
import { nanoid } from "@reduxjs/toolkit";

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
}