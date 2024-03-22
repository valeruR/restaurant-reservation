export namespace OrderingDomainModel {
  export type Guest = {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
  };
  export type GuestsSection = {
    guests: Guest[];
    addGuest: () => void;
    removeGuest: (id: string) => void;
    updateGuest: (id: string, key: string, value: any) => void;
    changeOrganizer: (id: string) => void;
    onNext: () => void;
    isSubmittable: boolean;
  };
}