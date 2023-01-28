import { Address } from 'src/interfaces/services/models/Address';

export interface PersonData {
  taxpayer_code: string;
  fullname: string;
  place_of_living: Address;
  place_of_birth: Address;
  date_of_birth: string;
}

export interface DocData {
  type: number;
  blanks_numbers: number;
  notarial_action_id: number;
  sertificated_by: number;
  sertificating_date: string;
  sertificating_place: Address;
}
