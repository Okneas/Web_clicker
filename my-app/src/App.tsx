import React, { useEffect, useState } from 'react';
import './App.css';
import { thisPlayer } from './index';
import { Building } from './building';

function App() {
  const [clicks, setClicks] = useState(thisPlayer.pointsInTotal);
  let AddOnClick = () => {
    thisPlayer.pointsInTotal += thisPlayer.pointsPerClick;
    setClicks(thisPlayer.pointsInTotal+thisPlayer.pointsPerClick);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setClicks((prevCount) => prevCount + thisPlayer.pointsPerSecond);
      thisPlayer.pointsInTotal += thisPlayer.pointsPerSecond;
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setClicks(thisPlayer.pointsInTotal);
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
          <p>Кол-во очков {clicks.toFixed(2)}</p>
        </div>
      </div>
      <div className='building-panel'>
        <Building name='Bulding 1' count={0} baseCost={25} profitPerSecond={1} price={25}/>
      </div>
    </div>
  );
}

export default App;
