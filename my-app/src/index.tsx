import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {PlayerStat} from './Player';
import {BuildingClass} from './building'
export let thisPlayer = new PlayerStat();

export let listOfBuildings:Record<string, BuildingClass> = {
  'Build1': thisPlayer.Build1,
  'Build2': thisPlayer.Build2,
  'Build3': thisPlayer.Build3,
  'Build4': thisPlayer.Build4,
  'Build5': thisPlayer.Build5,
  'default': new BuildingClass('default', NaN, NaN ,NaN, {}), 
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <App />
);
