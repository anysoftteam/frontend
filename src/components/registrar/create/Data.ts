import { Passport } from 'src/interfaces/services/models/Passport';
import { User } from 'src/interfaces/services/models/User';

export type PassportData = Omit<Passport, 'id'>;

export type RegistrarData = Omit<User, 'id' | 'passport'> & { pass: string };
