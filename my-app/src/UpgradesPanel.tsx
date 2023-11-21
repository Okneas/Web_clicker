import { wrap } from "module";
import { thisPlayer } from ".";
import { containerOfUpgrades, beatifyNumber } from "./App";
import React, { useEffect, useState } from 'react';

export class Upgrade{
    UpReq: number;
    buildingID : number;
    pathToImg: string;
    price: number;
    effectFunction: Function;
    nameOfUpgrade: string;
    description?: string;
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
        this.description = '';
        if(TOU.name === "effectOnClick"){
            this.description += `Множитель дохода от клика: ${Eff}`;
        }
        else if(TOU.name === "effectOnBuilding"){
            this.description += `Множитель для ${effOnB}: ${Eff}`;
        }
        else if(TOU.name === "effectOnPersentForClick"){
            this.description += `Процент увеличения дохода от клика от общего дохода: ${Eff}%`;
        }
    };
}

interface propsUpgrade{
    up: Upgrade;
    id: number;
}

export function UpgradePlate(props: propsUpgrade){
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    document.addEventListener('mousemove', (event: MouseEvent) => {
        setX(event.clientX); // Координата X относительно видимой области страницы
        setY(event.clientY); // Координата Y относительно видимой области страницы
      });
    let onBuyUpgrade = () => {
        if(thisPlayer.pointsInTotal >= props.up.price){
            thisPlayer.pointsInTotal -= props.up.price;
            props.up.effectFunction(props.up.effectNumber, props.up.effectOnBuilding);
            thisPlayer.availableUpgrades.splice(props.id, 1);
            delete containerOfUpgrades[props.id];
        }
    }
    return(
        <div style={{display: "flex"}}>
            <div className="upgrade-plate" onClick={onBuyUpgrade}>{props.id}</div>
            <div className="upgrade-tip" style={{left:x, top:y}}>
                <img src={props.up.pathToImg}/>
                <p>Название: {props.up.nameOfUpgrade}</p>
                <p>Цена: {beatifyNumber(props.up.price)}</p>
                <p>Описание: {props.up.description}</p>
            </div>
        </div>
    );
}