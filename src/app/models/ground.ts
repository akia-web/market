import { ClientService } from '../services/client.service';

export interface Ground {
  color: string;
  locked: boolean;
  equipment: null | string;
  person: ClientService[];
}
