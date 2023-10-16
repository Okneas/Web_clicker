import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PlayerStat from './Player';

export let thisPlayer = new PlayerStat();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
