import { thisPlayer } from ".";
import { Upgrade } from "./UpgradesPanel";
import { listOfBuildings } from "./building";

let Up1Fun = () => {
    thisPlayer.pointsPerClick++;
}

let Up1 = new Upgrade('', Up1Fun, "First Upgrade", 100);

let Up2Fun = () => {
    listOfBuildings.Build1.profitPerSecond*=2;
}

let Up2 = new Upgrade('', Up2Fun, "First Upgrade", 500);

export let listOfUpgradesForFirstBuilding = {10: Up1,
                                             25: Up2,
                                             30: Up1}; 

