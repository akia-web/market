import {Component} from '@angular/core';
import {ComputerService} from '../../services/computer.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(public computerService: ComputerService) {}

  toggleDesktop(): void{
    this.computerService.toggle();
  }
}
