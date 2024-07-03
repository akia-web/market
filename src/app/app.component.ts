import { Component, OnDestroy, OnInit, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarketComponent } from './components/market/market.component';
import { DesktopComponent } from './components/desktop/desktop.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ComputerService } from './services/computer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarketComponent, DesktopComponent, NavBarComponent],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  private subscription?: Subscription;

  constructor(public computerService: ComputerService) {
  }
  title = 'market';
  desktopOpen = this.computerService.openDesktop()

  ngOnInit() {
    // this.subscription= this.computerService.openDesktop$.subscribe(value => {
    //   this.desktopOpen = value;
    //   console.log('Desktop open:', this.desktopOpen);
    // });
  }
  
  isOpenDesktop(){
    return this.computerService.openDesktop()
  }
  ngOnDestroy() {
    // Désabonner pour éviter les fuites de mémoire
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
