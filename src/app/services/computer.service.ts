import { Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
