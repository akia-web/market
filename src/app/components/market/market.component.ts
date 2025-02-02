import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Ground } from '../../models/ground';
import { Market } from '../../models/market';
import { MarketZone } from '../../models/marketZone';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss',
})
export class MarketComponent implements OnInit, AfterViewInit {
  // @ViewChild('equipementTapis', { static: false })
  // equipementTapisElement?: ElementRef;

  market: Market = {
    money: 0,
    zone: [],
  };
  idClient: number = 1;

  numberLineByZone: number = 6;
  numberCaseByZone: number = 10;
  numberZone: number = 9;
  sidewalk: Ground[] = [];

  scrollToEquipementTapis(): void {
    const equipment: HTMLElement | null = document.getElementById('equipementTapis');
    if (equipment) {
      equipment.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'center',
      });
    }
  }

  createMarket(): void {
    this.createZone();
  }

  createSideWalk(): void {
    const numberCase: number = (this.numberZone / 3) * 10;
    for (let i: number = 0; i < numberCase; i++) {
      const ground: Ground = {
        color: '#9F8D81',
        locked: false,
        equipment: null,
        person: [],
      };
      this.sidewalk.push(ground);
    }
  }

  createCases(z: number, h: number, w: number, zone: MarketZone): Ground {
    const ground: Ground = {
      color: '#9D9C9B',
      locked: true,
      equipment: null,
      person: [],
    };
    if (z === 0 || z === 3 || z === 6) {
      zone.type = 'garden';
      ground.color = '#5CB85C';
    }

    if (z === 7) {
      ground.locked = false;
      ground.color = '#E2B27A';

      if (h === 5 && w === 4) {
        ground.equipment = 'tapis';
        ground.color = '#ff0000';
      }
    }

    return ground;
  }

  createLines(z: number, zone: MarketZone): void {
    for (let h: number = 0; h < this.numberLineByZone; h++) {
      const line = [];
      for (let w: number = 0; w < this.numberCaseByZone; w++) {
        const ground = this.createCases(z, h, w, zone);
        line.push(ground);
      }
      zone.line.push(line);
    }
  }

  createZone(): void {
    for (let z: number = 0; z < this.numberZone; z++) {
      const zone: MarketZone = {
        locked: false,
        price: 0,
        line: [],
        type: 'market',
      };

      this.createLines(z, zone);
      this.market.zone.push(zone);
    }
  }

  ngOnInit(): void {
    this.createMarket();
    this.createSideWalk();

    const newClient: ClientService = new ClientService(0, null, 'out', 'perso1', 1);
    this.sidewalk[0].person.push(newClient);
    this.sidewalk[0].person[0].shop(this.sidewalk, this.market);
  }

  ngAfterViewInit(): void {
    this.scrollToEquipementTapis();
  }
}
