import {Ground} from "./ground";

export interface MarketZone {
    locked: boolean;
    price: number;
    line: Ground[][];
    type: string;
}
