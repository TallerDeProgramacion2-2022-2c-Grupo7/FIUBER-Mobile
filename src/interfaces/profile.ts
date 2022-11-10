interface DriverProfile {
  isDriver?: true;
  car: {
    brand: string;
    model: string;
    color: string;
    plate: string;
  };
}

interface PassengerProfile {
  isDriver?: false;
}
export interface CommonsProfile {
  firstName: string;
  lastName: string;
  email: string;
  verifiedPhone: boolean;
}

export type Profile = CommonsProfile & (DriverProfile | PassengerProfile);
