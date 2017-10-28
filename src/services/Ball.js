import image from '../static/images/ball.png'

class Ball {
	constructor (context, startX, startY, width, height) {
		const ballImage = new Image();
	  ballImage.src = image;
	  ballImage.onload = function(){
	    context.drawImage(ballImage, startX, startY, width, height);
	  }
	}
}

export default Ball
