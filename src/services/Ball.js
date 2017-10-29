import image from '../static/images/ball.png'

class Ball {
	constructor (context, startX, startY, width, height) {
		this.positionX = startX
		this.positionY = startY
		this.context = context
		this.width = width
		this.height = height

		this.ballImage = new Image();
	  this.ballImage.src = image;
	  this.ballImage.onload = this.render
	}

	get position () {
		return this.positionY
	}

	moveOn = (stepX, stepY) => {
		this.context.clearRect(this.positionX, this.positionY, this.width, this.height)
		this.positionX += stepX
		this.positionY += stepY
		this.render()
	}

	moveTo = (positionX, positionY) => {
		this.context.clearRect(this.positionX, this.positionY, this.width, this.height)
		this.positionX = positionX
		this.positionY = positionY
		this.render()
	}

	inPosition = (positionX, positionY, stepX, stepY) => {
		return (this.positionX === positionX || Math.abs(this.positionX - positionX) < stepX)
			&& (this.positionY === positionY || Math.abs(this.positionY - positionY) < stepY)
	}

  render = () => {
  	this.context.drawImage(this.ballImage, this.positionX, this.positionY, this.width, this.height);
  }
}

export default Ball
