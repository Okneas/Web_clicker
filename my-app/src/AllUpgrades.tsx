import { thisPlayer } from ".";
import * as UpPen from "./UpgradesPanel";
import {listOfBuildings } from "./index";

export let effectOnClick = (effect: number) => {
    thisPlayer.deafaultPointsPerClick*=effect;
}

export let effectOnBuilding = (effect: number, building: string) => {
    if(thisPlayer[building] !== undefined){
        thisPlayer[building].profitPerSecond*=effect;
    }
}

export let effectOnPersentForClick = (effect: number) => {
    thisPlayer.percentForClick+=effect;
}

let Up1_1 = new UpPen.Upgrade(10, 1, '', effectOnClick, "First Upgrade", 100, 2, '');

let Up1_2 = new UpPen.Upgrade(25, 1, '', effectOnPersentForClick, "Second Upgrade", 500, 2, "Build1");

let Up1_3 = new UpPen.Upgrade(50, 1, '', effectOnBuilding, "Third Upgrade", 700, 0.5, "Build1");

let Up2_1 = new UpPen.Upgrade(10, 1, '', effectOnBuilding, "First Upgrade", 1000, 1.5, 'Build1');

let Up2_2 = new UpPen.Upgrade(25, 1, '', effectOnPersentForClick, "Second Upgrade", 7000, 1, "Build1");

let Up2_3 = new UpPen.Upgrade(50, 1, '', effectOnBuilding, "Third Upgrade", 20000, 2, "Build2");

export let listOfUpgrades: Record<number, Record<number, UpPen.Upgrade>> = {1:{10: Up1_1,
                                 25: Up1_2,
                                 50: Up1_3},
                              2:{10: Up2_1,
                                 25: Up2_2,
                                 50: Up2_3}
                                };

                              

