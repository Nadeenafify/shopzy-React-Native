export type AddressType = "home" | "work" | "other";
export interface Address {
  id: string;           // unique id for each address
  fullName: string;     // recipient name
  phone: string;        // contact number
  city: string;         // city name
  street: string;       // street / road
  building: string;     // building / house number
  floor?: string;       // optional floor or apartment
  notes?: string;       // optional notes
  type: AddressType;    // home / work / other
}