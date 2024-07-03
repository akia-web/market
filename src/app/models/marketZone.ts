import { Line } from "./line";

export interface MarketZone {
    locked: boolean;
    price: number;
    zone: Line[];
    type: string;
}