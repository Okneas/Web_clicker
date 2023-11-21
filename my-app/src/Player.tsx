import { BuildingClass } from "./building";
import { listOfUpgrades } from "./AllUpgrades";
import { Upgrade } from "./UpgradesPanel";

export class PlayerStat{
    id: number;
    name: string;
    pswd: string;
    Build1: BuildingClass;
    Build2: BuildingClass;
    Build3: BuildingClass;
    Build4: BuildingClass;
    Build5: BuildingClass;
    pointsPerClick:number;
    deafaultPointsPerClick:number;
    percentForClick:number;
    pointsInTotal: number;
    pointsPerSecond: number;
    availableUpgrades: Array<[number, number]>;
    constructor(){
        this.pointsInTotal = 10000;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
        this.id = 0;
        this.pswd = "";
        this.name = "";
        this.Build1 = new BuildingClass(1, 'Build1', 10, 0, 1, listOfUpgrades[1]);
        this.Build2 = new BuildingClass(1, 'Build2', 100, 0, 3, listOfUpgrades[2]);
        this.Build3 = new BuildingClass(1, 'Build3', 1200, 0, 10, listOfUpgrades[1]);
        this.Build4 = new BuildingClass(1, 'Build4', 7000, 0, 60, listOfUpgrades[1]);
        this.Build5 = new BuildingClass(1, 'Build5', 20000, 0, 200, listOfUpgrades[1]);
        this.availableUpgrades = [];
        this.deafaultPointsPerClick = 1;
        this.percentForClick = 0;
    }
}

export class PlayerStatJSON{
    id: number;
    name: string;
    pswd: string;
    Build1: string;
    Build2: string;
    Build3: string;
    Build4: string;
    Build5: string;
    pointsPerClick:string;
    deafaultPointsPerClick:string;
    percentForClick:string;
    pointsInTotal: string;
    pointsPerSecond: string;
    availableUpgrades: string;
    constructor(player: PlayerStat){
        this.pointsInTotal = player.pointsInTotal.toString();
        this.pointsPerClick = player.pointsPerClick.toString();
        this.deafaultPointsPerClick = player.deafaultPointsPerClick.toString();
        this.percentForClick = player.percentForClick.toString();
        this.pointsPerSecond = player.pointsPerSecond.toString();
        this.id = 0;
        this.pswd = player.pswd;
        this.name = player.name;
        this.Build1 = JSON.stringify(player.Build1);
        this.Build2 = JSON.stringify(player.Build2);
        this.Build3 = JSON.stringify(player.Build3);
        this.Build4 = JSON.stringify(player.Build4);
        this.Build5 = JSON.stringify(player.Build5);
        this.availableUpgrades = JSON.stringify(player.availableUpgrades);
    }
}