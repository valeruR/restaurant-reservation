// Ajouter un guest
// Retirer un guest

import { IIDProvider } from "@ratatouille/modules/core/id-provider";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";

class StubIDProvider implements IIDProvider {
  generate(): string {
    return "1";
  }
};

const idProvider = new StubIDProvider();

const emptyInitialState: OrderingDomainModel.Guest[] = [];
const stateWithOneGuest: OrderingDomainModel.Guest[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 0
  }
];
const stateWithTwoUsers: OrderingDomainModel.Guest[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 0
  },
  {
    id: "2",
    firstName: "John",
    lastName: "Doe",
    age: 0
  }
];
const form = new GuestForm(idProvider);

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0
      }
    ])
  });

  it("shoud add a guest when there's already one", () => {
    const state = form.addGuest(stateWithOneGuest);
    expect(state).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0
      },
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0
      }
    ])
  });

  it("should add a guest when there are multiple guests", () => {
    const state = form.addGuest(stateWithTwoUsers);
    expect(state).toEqual([
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0
      },
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        age: 0
      },
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        age: 0
      }
    ])
  });
});

describe('Remove a guest', () => {
  it('When there is no user, the remove should do nothing', () => {
    const state = form.removeGuest(emptyInitialState, "1");
    expect(state).toEqual([]);
  });

  it('When there is a user with ID 1, the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithOneGuest, "1");
    expect(state).toEqual([]);
  });

  it('When there is two users, only the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithTwoUsers, "1");
    expect(state).toEqual([
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        age: 0
      }
    ]);
  });

});