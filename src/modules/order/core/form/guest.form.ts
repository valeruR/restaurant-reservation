import { produce } from "immer";

import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return produce(state, draft => {
      draft.guests.push({
        id: this.idProvider.generate(),
        firstName: "John",
        lastName: "Doe",
        age: 0
      });
    });
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return produce(state, draft => {
      draft.guests = draft.guests.filter(guest => guest.id !== id);
    });
  }

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return produce(state, draft => {
      draft.organizedId = draft.guests.some(guest => guest.id === id) ? id : null;
    });
  }

  isSubmittable(state: OrderingDomainModel.Form) {
    return state.organizedId !== null;
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return produce(state, draft => {
      draft.guests = draft.guests.map(guest => {
        if (guest.id === id) {
          return {
            ...guest,
            [key]: value
          }
        }
        return guest;
      });
    });
  }
}