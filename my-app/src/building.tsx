import { useState, useRef, useEffect } from "react";
import { thisPlayer } from "./index";
import  {containerOfUpgrades} from "./App";
import { Upgrade, UpgradePlate } from "./UpgradesPanel";
import { listOfBuildings } from "./index";

interface BuildingProps {
    name: string;
}

export class BuildingClass {
    name: string;
    count: number;
    baseCost: number;
    price: number;
    profitPerSecond: number;
    listOfUpgrades: Record<number, Upgrade>;
    constructor(name: string, baseCost: number, count: number, PPS: number, listUp: Record<number, Upgrade>){
        this.price = baseCost;
        this.name = name;
        this.baseCost = baseCost;
        this.count = count;
        this.profitPerSecond = PPS;
        this.listOfUpgrades = listUp;
    }
}

export function Building(props: BuildingProps) {
    let [stats, setStats] = useState({
        name: thisPlayer[props.name].name,
        price: thisPlayer[props.name].price,
        count:thisPlayer[props.name].count,
        PPS: thisPlayer[props.name].profitPerSecond,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                name: thisPlayer[props.name].name,
                price: thisPlayer[props.name].price,
                count: thisPlayer[props.name].count,
                PPS:thisPlayer[props.name].profitPerSecond,
            });
        }, 1);
        return () => {
            clearInterval(interval);
          };
        }, []);
    let onBuy = () => {
        if(thisPlayer.pointsInTotal >= thisPlayer[props.name].price) {
            thisPlayer.pointsInTotal -= thisPlayer[props.name].price;
            thisPlayer[props.name].count++;
            thisPlayer[props.name].price = Math.round(thisPlayer[props.name].baseCost*(1.15**thisPlayer[props.name].count)*100)/100;
            if(thisPlayer[props.name].listOfUpgrades[listOfBuildings[props.name].count] !== undefined){
                containerOfUpgrades.push(<UpgradePlate up={thisPlayer[props.name].listOfUpgrades[thisPlayer[props.name].count]} id={containerOfUpgrades.length}/>);
            }
            setStats({name: thisPlayer[props.name].name,
                price: thisPlayer[props.name].price,
                count: thisPlayer[props.name].count,
                PPS: thisPlayer[props.name].profitPerSecond});
            
        }
    }
    return (
        <div className="building-block" onClick={onBuy}>
            <p>Name: {stats.name} Price: {Math.round(stats.price*100)/100}</p>
            <p>Count: {stats.count} Profit Per Second: {Math.round(stats.PPS*stats.count*100)/100}</p>
        </div>
    );
}