import { thisPlayer } from ".";
import { Upgrade } from "./UpgradesPanel";
import {listOfBuildings } from "./index";

let effectOnClick = (effect: number) => {
    thisPlayer.pointsPerClick*=effect;
}

let effectOnBuilding = (building: string, effect: number) => {
    if(thisPlayer[building] !== undefined){
        thisPlayer[building].profitPerSecond*=effect;
    }
}

let Up1_1 = new Upgrade('', effectOnClick, "First Upgrade", 100, 1.1, '');

let Up1_2 = new Upgrade('', effectOnBuilding, "Second Upgrade", 500, 1.1, "Build1");

export let listOfUpgrades1 = {10: Up1_1,
                              25: Up1_2,
                              50: Up1_1};

                              

