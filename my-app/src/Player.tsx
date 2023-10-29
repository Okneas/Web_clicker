import { BuildingClass } from "./building";
import { listOfUpgrades1 } from "./AllUpgrades";

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
    pointsInTotal: number;
    pointsPerSecond: number;
    constructor(){
        this.pointsInTotal = 0;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
        this.id = 0;
        this.pswd = "";
        this.name = "";
        this.Build1 = new BuildingClass('Build1', 10, 0, 1, listOfUpgrades1);
        this.Build2 = new BuildingClass('Build2', 100, 0, 3, listOfUpgrades1);
        this.Build3 = new BuildingClass('Build3', 1200, 0, 10, listOfUpgrades1);
        this.Build4 = new BuildingClass('Build4', 7000, 0, 60, listOfUpgrades1);
        this.Build5 = new BuildingClass('Build5', 20000, 0, 200, listOfUpgrades1);
    }
    loadPlayer(userJSON: PlayerStatJSON) {
        this.pointsInTotal = Number(userJSON.pointsInTotal);
        this.pointsPerClick = Number(userJSON.pointsPerClick);
        this.pointsPerSecond = Number(userJSON.pointsPerSecond);
        this.id = Number(userJSON.id);
        this.pswd = userJSON.pswd;
        this.name = userJSON.name;
        this.Build1 = JSON.parse(userJSON.Build1);
        this.Build2 = JSON.parse(userJSON.Build2);
        this.Build3 = JSON.parse(userJSON.Build3);
        this.Build4 = JSON.parse(userJSON.Build4);
        this.Build5 = JSON.parse(userJSON.Build5);
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
    pointsInTotal: string;
    pointsPerSecond: string;
    constructor(player: PlayerStat){
        this.pointsInTotal = player.pointsInTotal.toString();
        this.pointsPerClick = player.pointsPerClick.toString();
        this.pointsPerSecond = player.pointsPerSecond.toString();
        this.id = 0;
        this.pswd = player.pswd;
        this.name = player.name;
        this.Build1 = JSON.stringify(player.Build1);
        console.log(this.Build1);
        this.Build2 = JSON.stringify(player.Build2);
        this.Build3 = JSON.stringify(player.Build3);
        this.Build4 = JSON.stringify(player.Build4);
        this.Build5 = JSON.stringify(player.Build5);
    }
}