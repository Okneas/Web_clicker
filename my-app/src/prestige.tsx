import { thisPlayer } from "src"
import { BuildingClass } from "./building";
import { listOfUpgrades } from "./AllUpgrades";

export const makePrestige = () => {
    thisPlayer.prestigePoints+= thisPlayer.prestigePointsOnCurrentRun;
    thisPlayer.availableUpgrades = [];
    thisPlayer.deafaultPointsPerClick = 1;
    thisPlayer.percentForClick = 0;
    thisPlayer.prestigePointsOnCurrentRun = 0;
    thisPlayer.pointsInTotal = 0;
    thisPlayer.Build1 = new BuildingClass(1, 'Build1', 10, 0, 1, listOfUpgrades[1]);
    thisPlayer.Build2 = new BuildingClass(1, 'Build2', 100, 0, 3, listOfUpgrades[2]);
    thisPlayer.Build3 = new BuildingClass(1, 'Build3', 1200, 0, 10, listOfUpgrades[1]);
    thisPlayer.Build4 = new BuildingClass(1, 'Build4', 7000, 0, 60, listOfUpgrades[1]);
    thisPlayer.Build5 = new BuildingClass(1, 'Build5', 20000, 0, 200, listOfUpgrades[1]);
}