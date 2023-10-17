import { useState, useRef } from "react";
import { thisPlayer } from "./index";

interface BuildingProps {
    name: string;
}

export class BuildingClass {
    name: string;
    count: number;
    baseCost: number;
    price: number;
    profitPerSecond: number;
    constructor(name: string, baseCost: number, count: number, PPS: number){
        this.price = baseCost;
        this.name = name;
        this.baseCost = baseCost;
        this.count = count;
        this.profitPerSecond = PPS;
    }
}

export let listOfBuildings = {
    'Build1': new BuildingClass('Build1', 10, 0, 1),
    'Build2': new BuildingClass('Build2', 100, 0, 5),
    'Build3': new BuildingClass('Build3', 750, 0, 15),
    'Build4': new BuildingClass('Build4', 1600, 0, 50),
    'default': new BuildingClass('default', NaN, NaN ,NaN), 
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

    let onBuy = () => {
        if(thisPlayer.pointsInTotal >= buildingEntity.current.price && buildingEntity.current!==listOfBuildings['default']) {
            thisPlayer.pointsInTotal -= buildingEntity.current.price;
            thisPlayer.pointsPerSecond+=buildingEntity.current.profitPerSecond;
            buildingEntity.current.count++;
            buildingEntity.current.price = Math.round(buildingEntity.current.baseCost*(1.15**buildingEntity.current.count)*100)/100;
            console.log(listOfBuildings[props.name].count);
            console.log(listOfBuildings[props.name].price);
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