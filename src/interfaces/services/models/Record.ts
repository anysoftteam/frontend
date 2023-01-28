import { Address } from './Address';
import { Person } from './Person';

export interface DocRecord {
  id?: number;
  type: number;
  blanks_numbers: number;
  notarial_action_id: number;
  sertificated_by: number;
  sertificating_date: string;
  sertificating_place: Address;
  person: Person;
}
