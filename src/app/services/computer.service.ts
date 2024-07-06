import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComputerService {
  constructor() {}

  openDesktop: WritableSignal<boolean> = signal(false);

  toggle(): void {
    this.openDesktop.set(!this.openDesktop());
  }
}
