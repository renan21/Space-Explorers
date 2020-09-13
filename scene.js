const backgroundColor = "#030318";
const width = 1200;
const height = 600;

const sprites = new Image();
//sprites.src = 'images/ship.png';
sprites.src = 'images/sprite.png';

//const width = window.innerWidth;
//const height = window.innerHeight;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


const maxStarRadius = 1.5;

canvas.width = width;
canvas.height = height;

let sceneActive = {}; 

const stars = createStars(width, height, 30);

function drawBackGround(){
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, width, height);
}


function drawStars(){
	
	stars.forEach(function(star) {
	  
	    const y = star.y;
		const r = star.r;
		var speedy = 1;
		
		if(r > 1.0){
			speedy = 1.5;
		}
		if(r < 0.5){
			speedy = 0.5;
		}

		star.x = star.x - speedy;

		if(star.x == 0){
			star.x = 1200;
		}
		
		fillCircle(ctx, star.x, y, r, "rgb(255, 255, 255)");
  });	
	
}

const ship = {
	spriteX: 0,
	spriteY: 0,
	width: 145,
	height: 40,
	x: 531,
	y: 230,	
	speedy: 0,
	draw(){
		if(startGameMessage.x > -75){
			ship.x = ship.x - ship.speedy;
		}
		
		ctx.drawImage(
			sprites,
			ship.spriteX, ship.spriteY,
			ship.width, ship.height,
			ship.x, ship.y,
			ship.width, ship.height
		);
		
	}
};

function createStars(width, height, spacing) {
  const stars = [];

  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      const star = {
        x: x + randomInt(spacing),
        y: y + randomInt(spacing),
        r: Math.random() * maxStarRadius,
      };
      stars.push(star);
    }
  }
  return stars;
}

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

function fillCircle(ctx, x, y, r, fillStyle) {
  ctx.beginPath();
  ctx.fillStyle = fillStyle;
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}


const startGameMessage = {
	spriteX: 440,
	spriteY: 0,
	width: 298,
	height: 294,
	x: 450,
	y: 100,
	speedy: 0,
	draw(){
		if(startGameMessage.x > -300){
			startGameMessage.x = startGameMessage.x - startGameMessage.speedy;
		}
		if(startGameMessage.x <= -300){
			changeScene(scenes.game);
		}
		ctx.drawImage(
			sprites,
			startGameMessage.spriteX, startGameMessage.spriteY,
			startGameMessage.width, startGameMessage.height,
			startGameMessage.x, startGameMessage.y,
			startGameMessage.width, startGameMessage.height
		);
		
	}	
};

const pressKeyMessage = {
	spriteX: 440,
	spriteY: 296,
	width: 304,
	height: 294,
	x: 448,
	y: 400,
	draw(){
		
		var data = new Date();
		var seg = data.getSeconds();
		
		if(seg % 2 == 0 && startGameMessage.x == 450){
			ctx.drawImage(
				sprites,
				pressKeyMessage.spriteX, pressKeyMessage.spriteY,
				pressKeyMessage.width, pressKeyMessage.height,
				pressKeyMessage.x, pressKeyMessage.y,
				pressKeyMessage.width, pressKeyMessage.height
			);
		}		
	}	
};

function changeScene(newScene){
	sceneActive = newScene;
}

const scenes = {
	start: {
		draw(){
			drawBackGround();
			drawStars();
			startGameMessage.draw();
			pressKeyMessage.draw();
			ship.draw();
		},
		update(){
			
		},
		keyPress(){
			ship.speedy = 5;
			startGameMessage.speedy = 5;
		}
	},
	
	game: {
		draw(){
			if(startGameMessage.x < 0){
				drawBackGround();
				drawStars();
				ship.draw();
			}
		},
		update(){
			
		}
	}
	
};

function render() {

//	drawBackGround();
//	drawStars();
	
//	startGameMessage.draw();
//	ship.draw();

	sceneActive.draw();
	sceneActive.update();
	console.log(sceneActive);
  
  requestAnimationFrame(render);
}

window.addEventListener('keydown', function(e){
	
	if(sceneActive.keyPress){
		sceneActive.keyPress();
	}
	
});

changeScene(scenes.start);
render();

// Font: emery