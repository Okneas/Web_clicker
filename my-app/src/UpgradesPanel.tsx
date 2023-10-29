import { thisPlayer } from ".";
import { containerOfUpgrades } from "./App";

export class Upgrade{
    pathToImg: string;
    price: number;
    effectFunction: Function;
    nameOfUpgrade: string;
    effectNumber: number;
    effectOnBuilding: string;
    constructor(PTI: string, TOU: Function, NOU: string, P: number, Eff: number, effOnB: string){
        this.nameOfUpgrade=NOU;
        this.pathToImg=PTI;
        this.effectFunction=TOU;
        this.price=P;
        this.effectNumber = Eff;
        this.effectOnBuilding = effOnB;
    };
}

interface propsUpgrade{
    up: Upgrade;
    id: number;
}

export function UpgradePlate(props: propsUpgrade){
    let onBuyUpgrade = () => {
        if(thisPlayer.pointsInTotal >= props.up.price){
            thisPlayer.pointsInTotal -= props.up.price;
            props.up.effectFunction(props.up.effectOnBuilding, props.up.effectNumber);
            delete containerOfUpgrades[props.id];
        }
    }
    return(
        <div className="upgrade-plate" onClick={onBuyUpgrade}></div>
    );
}