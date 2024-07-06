import {Ground} from "../models/ground";
import {Market} from "../models/market";

export class ClientMarket {
    position: number;
    line: number | null;
    zone: 0 | 1| 2| 3| 4 | 5 | 6 | 7 | 8 | 'out'
    design: string;
    id: number


    constructor(position :number, line: number | null, zone:  0 | 1| 2| 3| 4 | 5 | 6 | 7 | 8 | 'out', design:string, id: number){
        this.position = position;
        this.line = line;
        this.zone = zone;
        this.design = design
        this.id = id
    }

    avancer(sidewalk: Ground[], market: Market){
        setTimeout(()=>{
            if(this.zone === 'out'){
                if(this.position <10 ){

                console.log(market)
                sidewalk[this.position].person = sidewalk[this.position].person.filter((element:ClientMarket):boolean => element.id != this.id);
                this.position += 1

                    sidewalk[this.position].person.push(this)
                }else{
                    this.checkIfBehindEntry(sidewalk, market)
                }

            }
            this.avancer(sidewalk, market)
        }, 1000)

    }

    private checkIfBehindEntry(sidewalk: Ground[], market: Market){
        if(this.zone === 'out'){
            if(this.position<20){
            }
        }
    }

}
