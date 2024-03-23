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

const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizedId: null
};
const stateWithOneGuest: OrderingDomainModel.Form = {
  guests: [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      age: 0
    }
  ],
  organizedId: null
};
const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [
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
  ],
  organizedId: null
};

const form = new GuestForm(idProvider);

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
    expect(state.guests).toEqual([
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
    expect(state.guests).toEqual([
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
    expect(state.guests).toEqual([
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
    expect(state.guests).toEqual([]);
  });

  it('When there is a user with ID 1, the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithOneGuest, "1");
    expect(state.guests).toEqual([]);
  });

  it('When there is two users, only the user with ID 1 should be removed', () => {
    const state = form.removeGuest(stateWithTwoUsers, "1");
    expect(state.guests).toEqual([
      {
        id: "2",
        firstName: "John",
        lastName: "Doe",
        age: 0
      }
    ]);
  });

});

describe('Add an organizer', () => {
  it('setOrganizer ID when the user does not exist', () => {
    const state = form.changeOrganizer(emptyInitialState, "1");
    expect(state.organizedId).toEqual(null);
  });

  it('When there is no user, the organizer should be null', () => {
    const state = form.changeOrganizer(stateWithOneGuest, "1");
    expect(state.organizedId).toEqual("1");
  });
});

describe('Is submittable', () => {
  it('When no guest is an organizer, it shoud not be submittable', () => {
    const isSubmittable = form.isSubmittable(emptyInitialState);
    expect(isSubmittable).toEqual(false);
  });

  it('When a guest is an organizer, it should be submittable', () => {
    const withOrganizerState = {
      ...stateWithOneGuest,
      organizedId: "1"
    }
    const isSubmittable = form.isSubmittable(withOrganizerState);
    expect(isSubmittable).toEqual(true);
  });
});

describe('Update a guest', () => {
  it.each([
    {
      key: "firstName" as keyof OrderingDomainModel.Guest,
      value: "Jane"
    },
    {
      key: "lastName" as keyof OrderingDomainModel.Guest,
      value: "Smith"
    },
    {
      key: "age" as keyof OrderingDomainModel.Guest,
      value: 42
    }
  ])('should change the %s of the guest', ({ key, value }) => {
    const state = form.updateGuest(stateWithOneGuest, "1", key, value);
    expect(state.guests[0][key]).toEqual(value);
  });

  it('should do nothing if the guest does not exist', () => {
    const state = form.updateGuest(stateWithOneGuest, "2", "firstName", "Jane");
    expect(state.guests).toEqual(stateWithOneGuest.guests);
  });
});