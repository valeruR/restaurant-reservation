import React, { useRef } from "react";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering-domain-model";
import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";

export const useGuestsSection = () => {
  function addGuest() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
  }

  function updateGuest(id: string, key: string, value: any) {}

  function changeOrganizer(id: string) {}

  function onNext() {}

  function isSubmittable() {
    return false;
  }

  const { idProvider} = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  const [form, setForm] = React.useState<OrderingDomainModel.Form>({
    guests: [],
    organizedId: null
  });

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable: isSubmittable(),
    form
  }
};