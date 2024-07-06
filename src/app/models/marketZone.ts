import { Ground } from "./ground";
import { Line } from "./line";

export interface MarketZone {
    locked: boolean;
    price: number;
    line: Ground[][];
    type: string;
}