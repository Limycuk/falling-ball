import React, { Component } from 'react'
import moment from 'moment'

import Game from '../components/Game'
import Ball from '../services/Ball'
import {
	BALL_START_POSITION_X,
	BALL_START_POSITION_Y,
	BALL_WIDTH,
	BALL_HEIGHT,
	BALL_FINISH_POSITION_X,
	BALL_FINISH_POSITION_Y,
	BALL_ANIMATE_TIME,
	GRAVITY_FORCE
} from '../constants'

class GameContainer extends Component {
	constructor (props) {
		super(props)

		this.gameAreaRef = null
		this.ball = null
		this.repeater = null
		this.startTickTime = null
		this.pixelsPerMeter = null

		this.state = {
			isFalling: false,
			startTime: null,
			finishTime: null,
		}
	}

	getGameAreaRef = (ref) => {
		this.gameAreaRef = ref
	}

	componentDidMount () {
		const context = this.gameAreaRef.getContext("2d")
		this.ball = new Ball(context, BALL_START_POSITION_X, BALL_START_POSITION_Y, BALL_WIDTH, BALL_HEIGHT)

		const heightInMeters = GRAVITY_FORCE * Math.pow((BALL_ANIMATE_TIME / 1000), 2) / 2
		const heightInPixels = BALL_FINISH_POSITION_Y - BALL_START_POSITION_Y
		this.pixelsPerMeter = heightInPixels / heightInMeters
	}

	fallingDown = () => {
		this.repeater = requestAnimationFrame(this.fallingDown)
		let step

		if (this.startTickTime === null) {
			step = 0
		} else {
			const duration = moment().diff(this.state.startTime) / 1000
			const fps = 1000 / moment().diff(this.startTickTime)
			step = GRAVITY_FORCE * duration * this.pixelsPerMeter / fps
		}
		
		this.startTickTime = moment()
		this.ball.moveOn(0, step)

		if (this.ball.inPosition(BALL_FINISH_POSITION_X, BALL_FINISH_POSITION_Y, 0, step)) {
			cancelAnimationFrame(this.repeater)
			this.setState({
				finishTime: moment()
			})
		}
	}

	returnBall = () => {
		cancelAnimationFrame(this.repeater)
		this.ball.moveTo(BALL_START_POSITION_X, BALL_START_POSITION_Y)
	}

	startFallingDown = () => {
		this.setState({
			isFalling: true,
			startTime: moment(),
			finishTime: null,
		}, this.fallingDown)
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
				? `${finishTime.diff(startTime).toString()} ms`
				: '-' 
		}
		return (
			<Game {...props} />
		)
	}
}

export default GameContainer
