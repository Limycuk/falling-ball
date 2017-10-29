import React from 'react';
import PropTypes from 'prop-types'

import './styles.css';

import background from '../../static/images/background.jpg'

const Game = ({ getGameAreaRef, startFallingDown, resetFalling,
  isDisabledStartFalling, isDisabledResetFalling, spentTime }) => {
  return (
    <div className="game">
      <canvas
      	ref={getGameAreaRef}
      	width="800"
      	height="450"
      	className='game__area'
    	/>
      <button
        className="game__control"
        disabled={isDisabledStartFalling}
        onClick={startFallingDown}
      >
        Start
      </button>
      <div className="game__spent-time">{spentTime}</div>
      <button
        className="game__control"
        disabled={isDisabledResetFalling}
        onClick={resetFalling}
      >
        Reset
      </button>
    </div>
  );
}

Game.propTypes = {
  getGameAreaRef: PropTypes.func.isRequired,
  startFallingDown: PropTypes.func.isRequired,
  resetFalling: PropTypes.func.isRequired,
  isDisabledStartFalling: PropTypes.bool.isRequired,
  isDisabledResetFalling: PropTypes.bool.isRequired,
	spentTime: PropTypes.string.isRequired,
}

export default Game;
