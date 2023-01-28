import { Address } from './Address';

export interface Person {
  id?: number;
  taxpayer_code: string;
  fullname: string;
  place_of_living: Address;
  place_of_birth: Address;
  date_of_birth: string;
}
