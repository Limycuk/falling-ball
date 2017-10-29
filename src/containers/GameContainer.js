import React, { Component } from 'react'
import moment from 'moment'

import Game from '../components/Game'
import ballImage from '../static/images/ball.png'
import Ball from '../services/Ball'
import {
	BALL_START_POSITION_X,
	BALL_START_POSITION_Y,
	BALL_WIDTH,
	BALL_HEIGHT,
	BALL_FINISH_POSITION_X,
	BALL_FINISH_POSITION_Y,
	BALL_ANIMATE_TIME
} from '../constants'

class GameContainer extends Component {
	constructor (props) {
		super(props)

		this.gameAreaRef = null
		this.ball = null
		this.tickTimeout = null
		this.startTickTime = null
		this.startTime = null

		this.state = {
			isFalling: false,
			finishTime: null,
		}
	}

	getGameAreaRef = (ref) => {
		this.gameAreaRef = ref
	}

	componentDidMount () {
		const context = this.gameAreaRef.getContext("2d")
		this.ball = new Ball(context, BALL_START_POSITION_X, BALL_START_POSITION_Y, BALL_WIDTH, BALL_HEIGHT)
	}

	fallingDown = (remainingTime, step) => {
		this.startTickTime = moment()

		if (this.startTime === null) {
			this.startTime = this.startTickTime
		}

		this.ball.moveOn(0, step)

		if (!this.ball.inPosition(BALL_FINISH_POSITION_X, BALL_FINISH_POSITION_Y, 0, step)) {
				requestAnimationFrame(() => {
					const tickTime = moment().diff(this.startTickTime)
					const updatedRemainingTime = remainingTime - tickTime
					const newStep = tickTime * (BALL_FINISH_POSITION_Y - this.ball.position) / updatedRemainingTime
					/*console.log('OHHH == ', (9.8 * tickTime * tickTime / (2 * 1000 * 1000)))

					const newStep = Math.sqrt(2 * 9.8 * (9.8 * tickTime * tickTime / (2 * 1000 * 1000))) / 0.029 * tickTime
console.log('www == ', tickTime, newStep, updatedRemainingTime)*/
					this.fallingDown(updatedRemainingTime, Math.round(newStep))
				})

		} else {
			this.setState({
				finishTime: moment()
			})
		}
	}

	returnBall = () => {
		clearTimeout(this.tickTimeout)
		this.ball.moveTo(BALL_START_POSITION_X, BALL_START_POSITION_Y)
	}

	startFallingDown = () => {
		const step = 5

		this.setState({
			isFalling: true,
			finishTime: null,
		}, () => this.fallingDown(BALL_ANIMATE_TIME, step))
	}

	resetFalling = () => {
		this.startTime = null
		this.tickTime = null

		this.setState({
			isFalling: false,
			finishTime: null,
		}, this.returnBall)
	}

	render() {
		const { isFalling, startTime, finishTime } = this.state

		const props = {
			getGameAreaRef: this.getGameAreaRef,
			startFallingDown: this.startFallingDown,
			resetFalling: this.resetFalling,
			isDisabledStartFalling: isFalling,
			isDisabledResetFalling: !isFalling,
			spentTime: startTime !== null && finishTime !== null
				? `${finishTime.diff(this.startTime).toString()} ms`
				: '-' 
		}
		return (
			<Game {...props} />
		)
	}
}

export default GameContainer
