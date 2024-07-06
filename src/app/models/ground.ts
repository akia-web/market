import {ClientMarket} from "../classes/client";

export interface Ground {
    color: string;
    locked: boolean;
    equipment: null | string,
    person: ClientMarket[]
}
