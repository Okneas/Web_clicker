import { thisPlayer } from ".";
import { containerOfUpgrades } from "./App";

export class Upgrade{
    pathToImg: string;
    price: number;
    EffectOfUpgrade: Function;
    nameOfUpgrade: string;
    constructor(PTI: string, TOU: Function, NOU: string, P: number){
        this.nameOfUpgrade=NOU;
        this.pathToImg=PTI;
        this.EffectOfUpgrade=TOU;
        this.price=P;
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
            props.up.EffectOfUpgrade();
            delete containerOfUpgrades[props.id];
        }
    }
    return(
        <div className="upgrade-plate" onClick={onBuyUpgrade}></div>
    );
}