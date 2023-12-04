import React, { useEffect, useState } from 'react';
import './App.css';
import { thisPlayer } from './index';
import { Building } from './building';
import {addUser, getUser} from './API';
import { PlayerStatJSON } from './Player';
import { CaravanGen, Caravan } from './caravan';

export let beatifyNumber = (num: number) => {
  if(num <= 10**3)
    return num.toFixed(2);
  else if(num >= 10**3) 
    return (num/(10**3)).toFixed(2) + "K";
  else if(num >= 10**6)
    return (num/(10**6)).toFixed(2) + "M";
  else if(num >= 10**9)
    return (num/(10**9)).toFixed(2) + "B";
  else if(num >= 10**12)
    return (num/(10**12)).toFixed(2) + "T";
  else if(num >= 10**15)
    return (num/(10**15)).toFixed(2) + "Qa";
  else if(num >= 10**18)
    return (num/(10**18)).toFixed(2) + "Qi";
  else if(num >= 10**21)
    return (num/(10**21)).toFixed(2) + "Sx";
  else if(num >= 10**24)
    return (num/(10**24)).toFixed(2) + "Sp";
  else if(num >= 10**27)
    return (num/(10**27)).toFixed(2) + "Oc";
  else if(num >= 10**30)
    return (num/(10**30)).toFixed(2) + "No";
  else if(num >= 10**33)
    return (num/(10**33)).toFixed(2) + "De";
}

export let containerOfUpgrades: JSX.Element[] = [];

export let changeMultPerSecond = (mult: number) => {
  bonusMultPerSecond = mult;
}

export let changeMultPerClick = (mult: number) => {
  bonusMultPerClick = mult;
}

let bonusMultPerSecond = 1;
let bonusMultPerClick = 1;

export function App() {
  const [PPT, setPPT] = useState(thisPlayer.pointsInTotal);
  const [PPC, setPPC] = useState(thisPlayer.pointsPerClick);
  const [PPS, setPPS] = useState(thisPlayer.pointsPerSecond);
  let cordinates = {x: 0, y: 0};

  let body = document.querySelector("body");

  const calcDistance = (a, b) => {
    const diffX = b.x - a.x,
          diffY = b.y - a.y;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }

  const determinePointQuantity = distance => {
    return Math.max(Math.floor(distance / 10),1);
  }

  let start = new Date().getTime();

  const originPosition = { x: 0, y: 0 };

  const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition
  }

  const adjustLastMousePosition = position => {
    if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
      last.mousePosition = position;
    }
  };

  const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

  const createGlowPoint = position => {
    const glow = document.createElement("div");
    
    glow.className = "glow-point";
    
    glow.style.left = position.x+"px";
    glow.style.top = position.y+"px";
    
    appendElement(glow)
    
    removeElement(glow, 75);
  }

  const createGlow = (last, current) => {
    const distance = calcDistance(last, current);
    const quantity = determinePointQuantity(distance);
    const dx = (current.x - last.x) / quantity,
          dy = (current.y - last.y) / quantity;
    
    Array.from(Array(quantity)).forEach((_, index) => { 
      const x = last.x + dx * index, 
            y = last.y + dy * index;
      
      createGlowPoint({ x, y });
    });
  }

  const updateLastMousePosition = position => last.mousePosition = position;

  const handleMouseObjects = (e:MouseEvent) => {
    const mousePosition = { x: e.pageX, y: e.pageY }
  
    adjustLastMousePosition(mousePosition);
    let time = new Date().getTime();
    if(calcDistance(cordinates,{x: mousePosition.x, y: mousePosition.y}) >= 100 || time-start >= 250){
      start = time;
      cordinates = {x: mousePosition.x, y: mousePosition.y};
      let dot = document.createElement("div");
      let rand = Math.round(Math.random() * (2 - 1) + 1);
      if(rand === 1){
        dot.classList.add("virus");
      }
      else if(rand === 2){
        dot.classList.add("skull");
      }
      dot.style.top = mousePosition.y  + "px";
      dot.style.left = mousePosition.x + "px";
      body?.appendChild(dot);
      setTimeout(() => {
        body?.removeChild(dot);
      }, 1500)
    }
    createGlow(last.mousePosition, mousePosition);
    updateLastMousePosition(mousePosition);
  } 
  
  const AddPlayerOnClick = () => {
    const inputUsername = document.getElementById('username') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;

    thisPlayer.name = inputUsername.value;
    thisPlayer.pswd = inputPassword.value;

    let playerJSON: PlayerStatJSON = new PlayerStatJSON(thisPlayer);
    addUser(playerJSON);
  }

  const LoadOnClick = () => {
    const inputUsername = document.getElementById('username') as HTMLInputElement;
    const inputPassword = document.getElementById('password') as HTMLInputElement;
    thisPlayer.name = inputUsername.value;
    thisPlayer.pswd = inputPassword.value;
    getUser();
  }

  const AddOnClick = () => {
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
      thisPlayer.pointsPerSecond = bonusMultPerSecond*((thisPlayer.Build1.count*thisPlayer.Build1.profitPerSecond)+
      (thisPlayer.Build2.count*thisPlayer.Build2.profitPerSecond)+
      (thisPlayer.Build3.count*thisPlayer.Build3.profitPerSecond)+
      (thisPlayer.Build4.count*thisPlayer.Build4.profitPerSecond)+
      (thisPlayer.Build5.count*thisPlayer.Build5.profitPerSecond));
      thisPlayer.pointsPerClick = bonusMultPerClick * (thisPlayer.deafaultPointsPerClick + 
                                  (thisPlayer.pointsPerSecond * (thisPlayer.percentForClick/100)));
      setPPT(thisPlayer.pointsInTotal);
      setPPC(thisPlayer.pointsPerClick);  
      setPPS(thisPlayer.pointsPerSecond);
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseObjects);
    document.body.onmouseleave = () => updateLastMousePosition(originPosition);
    return () => {
      window.removeEventListener('mousemove', handleMouseObjects);
    };
  },[]);

  return (
    <div className='main-block'>
      <CaravanGen key={1}/>
  
      <div className='clicker-block'>
        <div className='clicker-wrap'>
          <div className="clicker" onClick={AddOnClick}>
          </div>
        </div>
        <div className='info_clicks'>
          <p>Всего очков: {beatifyNumber(PPT)}</p>
          <p>Очков в секунду: {beatifyNumber(PPS)}</p>
          <p>Кол-во очков за клик: {beatifyNumber(PPC)}</p>
        </div>
      </div>
      <div className='registration-block'>
        <p className='registration-text'>Никнейм</p>
        <input type="email" className='input-username' id='username'/>
        <p className='registration-text'>Пароль</p>
        <input type="email" className='input-password' id='password'/>
        <button type="button" value="" className='registration-button' onClick={LoadOnClick}>Загрузить</button>
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
      <div className='hzchoza-block' >
      </div>
    </div>
  );
}

export default App;