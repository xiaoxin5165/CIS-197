import React from 'react';
import ReactDOM from 'react-dom';
import GameOfLife from './components/GameOfLife';

const gameOfLife = <GameOfLife />;

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    gameOfLife,
    document.getElementById('container')
  );
});
