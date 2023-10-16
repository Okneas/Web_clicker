import { useState, useRef } from "react";
import { thisPlayer } from "./index";

class BuildingClass {
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

interface BuildingProps {
    name: string;
    count: number;
    baseCost:number;
    price: number;
    profitPerSecond: number;
}

export function Building(props: BuildingProps) {
    let buildingEntity = useRef(new BuildingClass(props.name, props.baseCost, props.count, props.profitPerSecond));
    let [stats, setStats] = useState({
        name: buildingEntity.current.name,
        price: buildingEntity.current.price,
        count: buildingEntity.current.count,
        PPS: buildingEntity.current.profitPerSecond,
    });

    let onBuy = () => {
        if(thisPlayer.pointsInTotal >= buildingEntity.current.price) {
            thisPlayer.pointsInTotal -= buildingEntity.current.price;
            thisPlayer.pointsPerSecond+=buildingEntity.current.profitPerSecond;
            buildingEntity.current.count++;
            buildingEntity.current.price = Math.round(buildingEntity.current.baseCost*(1.15**buildingEntity.current.count)*100)/100;
            console.log(buildingEntity.current.count);
            console.log(buildingEntity.current.price);
            setStats({name: buildingEntity.current.name,
                price: buildingEntity.current.price,
                count: buildingEntity.current.count,
                PPS: buildingEntity.current.profitPerSecond});
        }
    }
    return (
        <div className="building-block" onClick={onBuy}>
            <p>Name: {stats.name} Price: {stats.price}</p>
            <p>Count: {stats.count} Profit Per Second: {stats.PPS}</p>
        </div>
    );
}