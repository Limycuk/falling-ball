import React, { Component } from 'react'

import Game from '../components/Game'
import ballImage from '../static/images/ball.png'
import Ball from '../services/Ball'

class GameContainer extends Component {
	constructor (props) {
		super(props)

		this.gameAreaRef = null

		this.state = {
			isFalling: false
		}
	}

	getGameAreaRef = (ref) => {
		this.gameAreaRef = ref
	}

	componentDidMount () {
		const context = this.gameAreaRef.getContext("2d")
		const ball = new Ball(context, 309, 10, 40, 40)
	}

	fallingDown = () => {
		console.log('FALLING DOWN')
	}

	startFallingDown = () => {
		this.setState({
			isFalling: true
		}, this.fallingDown)
	}

	resetFalling = () => {
		this.setState({
			isFalling: false
		})
	}

	render() {
		const { isFalling } = this.state

		const props = {
			getGameAreaRef: this.getGameAreaRef,
			startFallingDown: this.startFallingDown,
			resetFalling: this.resetFalling,
			isDisabledStartFalling: isFalling,
			isDisabledResetFalling: !isFalling,
		}
		return (
			<Game {...props} />
		)
	}
}

export default GameContainer
