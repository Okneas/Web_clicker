import { thisPlayer } from ".";
import { containerOfUpgrades } from "./App";

export class Upgrade{
    UpReq: number;
    buildingID : number;
    pathToImg: string;
    price: number;
    effectFunction: Function;
    nameOfUpgrade: string;
    effectNumber: number;
    effectOnBuilding: string;
    constructor(UR: number, BID: number, PTI: string, TOU: Function, NOU: string, P: number, Eff: number, effOnB: string){
        this.nameOfUpgrade=NOU;
        this.buildingID = BID;
        this.UpReq = UR;
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
            props.up.effectFunction(props.up.effectNumber, props.up.effectOnBuilding);
            console.log(thisPlayer.availableUpgrades[props.id]);
            thisPlayer.availableUpgrades.splice(props.id);
            containerOfUpgrades.splice(props.id);
        }
    }
    return(
        <div className="upgrade-plate" onClick={onBuyUpgrade}></div>
    );
}