import {Component} from '@angular/core';
import {ComputerService} from '../../services/computer.service';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss'
})
export class DesktopComponent {
  constructor(public computerService: ComputerService) {
  }

  closeDestop(): void {
    this.computerService.toggle();
  }

}
