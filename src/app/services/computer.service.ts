import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor() { }
  openDesktop = signal(false);

  toggle() {
    this.openDesktop.set(!this.openDesktop());
  }

}
