import { Address } from './Address';
import { Person } from './Person';
import { DocRecord } from './Record';

type Rec = Omit<DocRecord, 'sertificating_place' | 'person'> & {
  sertificating_place: Partial<Address>;
  person: Partial<Person>;
};

export interface HistoryRec {
  edit: Partial<Rec>;
  time: string;
  user: {
    name: string;
    id: number;
  };
}
