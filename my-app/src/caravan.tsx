import React, { useEffect, useRef, useState } from 'react';
import { thisPlayer } from 'src';
import {changeMultPerClick, changeMultPerSecond} from './App';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function increseClick(num: number) {
  changeMultPerClick(num);

  await delay(20000); // Задержка в 2000 миллисекунд (2 секунды)
  
  changeMultPerClick(1);
}

async function increseIncome(num: number) {
  changeMultPerSecond(num);

  await delay(20000); // Задержка в 2000 миллисекунд (2 секунды)
  
  changeMultPerSecond(1);
}

interface CaravanProps{
    id: number;
    x?: number;
    y?:number;
  }

function randomNumberBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

let caravanList: JSX.Element[] = [];

export let CaravanGen = () => {
  const[carList, setCarList] = useState(caravanList);

  useEffect(() => {

    const interval = setInterval(() => {
      setCarList(caravanList);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [carList]);

  useEffect(() => {
    let timer = randomNumberBetween(3000, 6000);

    const interval = setInterval(() => {
      if(caravanList.length === 0){
        const x = Math.round(randomNumberBetween(0, 1900));
        const y = Math.round(randomNumberBetween(0, 1000));
        caravanList = [
          ...caravanList,
          <Caravan id={caravanList.length} x={x} y={y} />
        ];
        setCarList(caravanList);
      }
    }, timer);

    return () => {
      clearInterval(interval);
    };
  }, [carList]);

  return(<div className='caravan-gen'>{carList}</div>);
}  
  
export function Caravan(props: CaravanProps) {
    let deleteOnClick = () => {
      caravanList = caravanList.filter((_, index) => index !== props.id);
      let choice = Math.round(randomNumberBetween(0,100));
      if(choice <= 20) {
        thisPlayer.pointsInTotal -= thisPlayer.pointsInTotal*0.5;
      }
      else if(choice > 20 && choice <= 40){
        thisPlayer.pointsInTotal += thisPlayer.pointsInTotal*0.5;
      }
      else if(choice > 30 && choice <= 45) {
        increseClick(2);
      }
      else if(choice > 45 && choice <= 60){
        increseClick(0.5);
      }
      else if(choice > 60 && choice <= 80){
        thisPlayer.pointsInTotal += thisPlayer.pointsInTotal*2;
      }
      else if(choice > 80 && choice <= 90){
        increseIncome(0.5);
      }
      else if(choice > 90 && choice <= 100){
        increseIncome(2);
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        caravanList = caravanList.filter((_, index) => index !== props.id);
      }, 5000);
      return () => {
        clearInterval(interval);
      };
    }, []);

    return(
      <div onClick={deleteOnClick} className="caravan-pop" style={{
        zIndex:10,
        position: 'absolute',
        left: `${props.x}px`,
        top:  `${props.y}px`,
        width: "100px",
        height: "100px",
      }}>
      </div>
    );
  }