import { thisPlayer } from ".";
import * as UpPen from "./UpgradesPanel";
import {listOfBuildings } from "./index";

export let effectOnClick = (effect: number) => {
    thisPlayer.pointsPerClick*=effect;
}

export let effectOnBuilding = (effect: number, building: string,) => {
    if(thisPlayer[building] !== undefined){
        thisPlayer[building].profitPerSecond*=effect;
    }
}

let Up1_1 = new UpPen.Upgrade(10, 1, '', effectOnClick, "First Upgrade", 100, 1.1, '');

let Up1_2 = new UpPen.Upgrade(25, 1, '', effectOnBuilding, "Second Upgrade", 500, 1.1, "Build1");

let Up1_3 = new UpPen.Upgrade(50, 1, '', effectOnBuilding, "Second Upgrade", 700, 1.5, "Build2");

export let listOfUpgrades: Record<number, Record<number, UpPen.Upgrade>> = {1:{10: Up1_1,
                                 25: Up1_2,
                                 50: Up1_3},
                              2:{}};

                              

