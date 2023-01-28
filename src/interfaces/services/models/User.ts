import { Passport } from './Passport';

export interface User {
  id?: number;
  fullname: string;
  email: string;
  date_of_birth: string;
  passport: Passport;
  organization: string;
  position: string;
  taxpayer_code: string;
  is_enable?: boolean;
}
