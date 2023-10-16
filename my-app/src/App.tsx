import React, { useEffect, useState } from 'react';
import './App.css';
import { thisPlayer } from './index';

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

  return (
    <div>
      <div className="clicker" onClick={AddOnClick}></div>
      <div className='info_clicks'>
        <p>Кол-во очков {clicks}</p>
      </div>
      <div>

      </div>
    </div>
  );
}

export default App;
