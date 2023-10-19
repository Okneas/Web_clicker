export default class PlayerStat{
    pointsPerClick:number;
    pointsInTotal: number;
    pointsPerSecond: number;
    constructor(){
        this.pointsInTotal = 1000000;
        this.pointsPerClick = 1;
        this.pointsPerSecond = 0;
    }
}