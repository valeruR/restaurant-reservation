import React from "react";

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
};

export const useGuestsSection = () => {
  function addGuest() {
    const newGuest: Guest = {
      id: Math.random().toString(),
      firstName: "",
      lastName: "",
      age: 0
    };

    setGuests([...guests, newGuest]);
  }

  function removeGuest(id: string) {
    setGuests(guests.filter(guest => guest.id !== id));
  }

  function updateGuest(id: string, key: string, value: any) {}

  function changeOrganizer(id: string) {}

  function onNext() {}

  function isSubmittable() {
    return false;
  }

  const [guests, setGuests] = React.useState<Guest[]>([]);

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable: isSubmittable(),
    guests
  }
};