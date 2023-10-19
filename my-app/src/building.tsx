import { useState, useRef, useEffect } from "react";
import { thisPlayer } from "./index";
import { listOfUpgradesForFirstBuilding } from "./AllUpgrades";
import  {containerOfUpgrades} from "./App";
import { Upgrade, UpgradePlate } from "./UpgradesPanel";

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

export let listOfBuildings:Record<string, BuildingClass> = {
    'Build1': new BuildingClass('Build1', 10, 0, 1, listOfUpgradesForFirstBuilding),
    'Build2': new BuildingClass('Build2', 100, 0, 5, listOfUpgradesForFirstBuilding),
    'Build3': new BuildingClass('Build3', 750, 0, 15, listOfUpgradesForFirstBuilding),
    'Build4': new BuildingClass('Build4', 1600, 0, 50, listOfUpgradesForFirstBuilding),
    'Build5': new BuildingClass('Build5', 5000, 0, 200, listOfUpgradesForFirstBuilding),
    'default': new BuildingClass('default', NaN, NaN ,NaN, {}), 
}

export function Building(props: BuildingProps) {
    let buildingType;
    if(listOfBuildings[props.name] === undefined){
        buildingType = listOfBuildings['default'];
    }
    else{
        buildingType = listOfBuildings[props.name];
    }
    let buildingEntity = useRef(buildingType);
    let [stats, setStats] = useState({
        name: buildingEntity.current.name,
        price: buildingEntity.current.price,
        count: buildingEntity.current.count,
        PPS: buildingEntity.current.profitPerSecond,
    });
    useEffect(() => {
        const interval = setInterval(() => {
            setStats({
                name: buildingEntity.current.name,
                price: buildingEntity.current.price,
                count: buildingEntity.current.count,
                PPS: buildingEntity.current.profitPerSecond,
            });
        }, 1);
        return () => {
            clearInterval(interval);
          };
        }, []);
    let onBuy = () => {
        if(thisPlayer.pointsInTotal >= buildingEntity.current.price && buildingEntity.current!==listOfBuildings['default']) {
            thisPlayer.pointsInTotal -= buildingEntity.current.price;
            thisPlayer.pointsPerSecond+=buildingEntity.current.profitPerSecond;
            buildingEntity.current.count++;
            buildingEntity.current.price = Math.round(buildingEntity.current.baseCost*(1.15**buildingEntity.current.count)*100)/100;
            if(buildingEntity.current.listOfUpgrades[buildingEntity.current.count] !== undefined){
                containerOfUpgrades.push(<UpgradePlate up={buildingEntity.current.listOfUpgrades[buildingEntity.current.count]} id={containerOfUpgrades.length}/>);
            }
            setStats({name: buildingEntity.current.name,
                price: buildingEntity.current.price,
                count: buildingEntity.current.count,
                PPS: buildingEntity.current.profitPerSecond});
            
        }
    }
    return (
        <div className="building-block" onClick={onBuy}>
            <p>Name: {stats.name} Price: {stats.price}</p>
            <p>Count: {stats.count} Profit Per Second: {stats.PPS*stats.count}</p>
        </div>
    );
}