import { listOfBuildings, thisPlayer } from "./index";
import {PlayerStatJSON} from "./Player";
import axios from "axios";
import {UpgradePlate} from "./UpgradesPanel";
import { containerOfUpgrades } from "./App";
import { listOfUpgrades } from "./AllUpgrades";

export const addUser = async (user:  PlayerStatJSON) => {
    try {
      const response = await axios.post('https://localhost:7011/Data/post', user);
      console.log(response.data); // Ответ от сервера
    } catch (error) {
      console.error('Error:', error);
    }
  };

export const getUser = async () => {
  try{
    const response = await axios.get(`https://localhost:7011/Data/${thisPlayer.name}/${thisPlayer.pswd}`);
    if(response.data.build1 !== null){
      console.log(response.data); // Ответ от сервера
      thisPlayer.Build1 = JSON.parse(response.data.build1);
      thisPlayer.Build2 = JSON.parse(response.data.build2);
      thisPlayer.Build3 = JSON.parse(response.data.build3);
      thisPlayer.Build4 = JSON.parse(response.data.build4);
      thisPlayer.Build5 = JSON.parse(response.data.build5);
      listOfBuildings.Build1 = JSON.parse(response.data.build1);
      listOfBuildings.Build2 = JSON.parse(response.data.build2);
      listOfBuildings.Build3 = JSON.parse(response.data.build3);
      listOfBuildings.Build4 = JSON.parse(response.data.build4);
      listOfBuildings.Build5 = JSON.parse(response.data.build5);
      thisPlayer.name = response.data.name;
      thisPlayer.id = response.data.id;
      thisPlayer.pointsInTotal = Number(response.data.pointsInTotal);
      thisPlayer.pointsPerClick = Number(response.data.pointsPerClick);
      thisPlayer.pswd = response.data.pswd;
      thisPlayer.availableUpgrades = JSON.parse(response.data.availableUpgrades);
      thisPlayer.availableUpgrades.forEach(element => {
        containerOfUpgrades.push(<UpgradePlate up={listOfUpgrades[element[0]][element[1]]} id={containerOfUpgrades.length}/>);
        console.log(containerOfUpgrades);
      });
    }// Ответ от сервера
  }
  catch(error){
    console.error('Error:', error);
  }
}