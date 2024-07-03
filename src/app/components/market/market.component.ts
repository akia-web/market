import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ground } from '../../models/ground';
import { Market } from '../../models/market';
import { MarketZone } from '../../models/marketZone';
import { Line } from '../../models/line';

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [],
  templateUrl: './market.component.html',
  styleUrl: './market.component.scss'
})
export class MarketComponent implements OnInit, AfterViewInit {


  @ViewChild('equipementTapis', { static: false }) equipementTapisElement?: ElementRef;

  scrollToEquipementTapis(): void {
      if (this.equipementTapisElement && this.equipementTapisElement.nativeElement) {
          this.equipementTapisElement.nativeElement.scrollIntoView(
            { behavior: 'smooth', 
              block: 'start', 
              inline: 'center' 
            }
          );
      }
  }


  market: Market = {
    money : 0,
    zone : []
  } 

  numberLineByZone : number = 6;
  numberCaseByZone : number = 10;
  numberZone : number = 9;



  createMarket(){
    this.createZone();
  }


  createCases(z: number, h: number, w: number, zone: MarketZone, ): Ground{
    const ground : Ground = {color: '#9D9C9B', locked: true, equipment: null }
      if(z===0 || z === 3 ||z === 6){
        zone.type = 'garden';
        ground.color = "#5CB85C";
      }
      
      
      if(z === 7){
        ground.locked = false;
        ground.color = "#E2B27A";

        if(h === (5) && w === 4){
            ground.equipment = "tapis";
            ground.color = '#ff0000';
        }
      }

      return ground;

  }

  createLines( z: number, h: number, zone: MarketZone): Line{

    const line : Line = {line: []};
        
    for(let w: number = 0; w< this.numberCaseByZone; w++){
      
      const ground = this.createCases(z, h, w, zone);
      line.line.push(ground);
    }

    return line;
  }

  createZone(): void{

    for (let z: number = 0; z < this.numberZone; z++){
      const zone : MarketZone = {
        locked : false,
        price: 0,
        zone: [],
        type: 'market'
      };

      for(let h: number  = 0; h< this.numberLineByZone; h++){
        zone.zone.push(this.createLines(z, h, zone));
      }

      this.market.zone.push(zone);
    }

  }


  ngOnInit(): void {
      this.createMarket();
  }

  ngAfterViewInit(): void {
      this.scrollToEquipementTapis();     
  }

}
