import React, { useEffect, useState } from 'react';
import './App.css';
import { thisPlayer } from './index';
import { Building } from './building';
import {addUser} from './API';
import { PlayerStatJSON } from './Player';

export let containerOfUpgrades: JSX.Element[] = [];

export function App() {
  const [PPT, setPPT] = useState(thisPlayer.pointsInTotal);
  const [PPC, setPPC] = useState(thisPlayer.pointsPerClick);
  const [PPS, setPPS] = useState(thisPlayer.pointsPerSecond);
  
  let AddPlayerOnClick = () => {
    const inputUsername = document.getElementById('username') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;

    thisPlayer.name = inputUsername.value;
    thisPlayer.pswd = inputPassword.value;

    let playerJSON: PlayerStatJSON = new PlayerStatJSON(thisPlayer);
    addUser(playerJSON);
    console.log(thisPlayer);
  }

  let AddOnClick = () => {
    thisPlayer.pointsInTotal += thisPlayer.pointsPerClick;
    setPPT(thisPlayer.pointsInTotal+thisPlayer.pointsPerClick);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPPT((prevCount) => prevCount + thisPlayer.pointsPerSecond);
      thisPlayer.pointsInTotal += thisPlayer.pointsPerSecond;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPPT(thisPlayer.pointsInTotal);
      setPPC(thisPlayer.pointsPerClick);
      setPPS(thisPlayer.pointsPerSecond);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='main-block'>
      <div className='clicker-block'>
        <div className="clicker" onClick={AddOnClick}>
        </div>
        <div className='info_clicks'>
          <p>Всего очков: {PPT.toFixed(2)}</p>
          <p>Очков в секунду: {PPS.toFixed(2)}</p>
          <p>Кол-во очков за клик: {PPC.toFixed(2)}</p>
        </div>
      </div>
      <div className='registration-block'>
        <p className='registration-text'>Никнейм</p>
        <input type="email" className='input-username' id='username'/>
        <p className='registration-text'>Пароль</p>
        <input type="email" className='input-password' id='password'/>
        <button type="button" value="" className='registration-button' >Загрузить</button>
        <button type="button" value="" className='registration-button' onClick={AddPlayerOnClick}>Сохранить</button>
      </div>
      <div className='building-panel'>
        <div className='upgrade-panel'>
          {containerOfUpgrades}
        </div>
        <Building name='Build1'/>
        <Building name='Build2'/>
        <Building name='Build3'/>
        <Building name='Build4'/>
        <Building name='Build5'/>
      </div>
    </div>
  );
}

export default App;