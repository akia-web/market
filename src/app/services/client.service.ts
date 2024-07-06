import { Ground } from '../models/ground';
import { Market } from '../models/market';
import { elementMag } from '../../config/elementMag';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  position: number;
  line: number | null;
  zone: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'out';
  out: 0 | 1 | 2 | false = 0;
  design: string;
  id: number;
  direction: 'right' | 'left' | 'top' | 'bottom' = 'right';

  constructor(position: number, line: number | null, zone: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'out', design: string, id: number) {
    this.position = position;
    this.line = line;
    this.zone = zone;
    this.design = design;
    this.id = id;
  }

  shop(sidewalk: Ground[], market: Market) {
    this.goToEntrance(sidewalk, market);
  }

  goToEntrance(sidewalk: Ground[], market: Market) {
    setTimeout((): void => {
      if (typeof this.out === 'number' && (this.position === 10 || this.position === 20)) {
        this.out += 1;
      }

      if (typeof this.out === 'number' && this.out >= 1) {
        const isBehind: boolean = this.checkBehindEntry(sidewalk, market);
        if (isBehind) {
          this.removeOldClient(sidewalk);
          this.position = this.position - this.out * 10;

          // si ou = 1 alors sa zone est = a 7 sinon a 8
          this.zone = this.out === 1 ? 7 : 8;
          this.line = 5;
          market.zone[this.zone].line[this.line][this.position].person.push(this);
          return;
        }
      }

      this.goRight(sidewalk);
      sidewalk[this.position].person.push(this);

      if (this.position === 29) {
        return;
      }
      this.goToEntrance(sidewalk, market);
    }, 1000);
  }

  goRight(sidewalk: Ground[]) {
    this.removeOldClient(sidewalk);
    this.position += 1;
  }

  checkBehindEntry(sidewalk: Ground[], market: Market): boolean {
    if (typeof this.out === 'number') {
      const personnageCase: number = this.position - this.out * 10;
      return elementMag.entrance[1] === personnageCase;
    }
    return false;
  }

  removeOldClient(sidewalk: Ground[]) {
    sidewalk[this.position].person = sidewalk[this.position].person.filter((element: ClientService): boolean => element.id != this.id);
  }
}
