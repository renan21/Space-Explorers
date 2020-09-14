const backgroundColor = "#030318";
const width = 1200;
const height = 600;

const sprites = new Image();

sprites.src = 'images/sprite.png';

//const width = window.innerWidth;
//const height = window.innerHeight;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');


const maxStarRadius = 1.5;

canvas.width = width;
canvas.height = height;

let sceneActive = {};
let frames = 0;

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
	width: 145,
	height: 40,
	x: 531,
	y: 230,	
	speedyX: 0,
	speedyY: 0,
	moves: [
		{spriteX: 0, spriteY: 0},
		{spriteX: 145, spriteY: 0},
		{spriteX: 290, spriteY: 0}
	],
	actualFrame: 0,
	updateFrame(){
		
		const frameInterval = 10;
		const intervalLimit = frames % frameInterval === 0;
		
		if(intervalLimit){
			const incrementBase = 1;
			const i = incrementBase + ship.actualFrame;
			const repeatBase = ship.moves.length;
			ship.actualFrame = i % repeatBase;
		}
	},
	
	draw(){
		ship.updateFrame();
		const {spriteX, spriteY} = ship.moves[ship.actualFrame];
	
		if(startGameMessage.x > -75 && sceneActive == scenes.start){			
			ship.x = ship.x - ship.speedyX;
		}
		
		if(sceneActive == scenes.game){
//			console.log(ship.x);
			
			if((ship.y < 25 && ship.speedyY < 0)  ||
			   (ship.y > 560 && ship.speedyY > 0) ||
			   (ship.x > 1050 && ship.speedyX > 0)||
			   (ship.x < 11 && ship.speedyX < 0)){
				ship.speedyY = 0;
				ship.speedyX = 0;
			} else {
				ship.x = ship.x + ship.speedyX;
				ship.y = ship.y + ship.speedyY;
			}
		}
				
		ctx.drawImage(
			sprites,
			spriteX, spriteY,
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
	ship.speedyX = 0;
	ship.speedyX = 0;	
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
			ship.speedyX = 5;
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
			
		},
		keyPress(key){
//			console.log(key.keyCode);

			if(key.keyCode == 87){
					ship.speedyY = -2;
			} else if(key.keyCode == 83){
					ship.speedyY = 2;
			} else if(key.keyCode == 68){
					ship.speedyX = 2;
			} else if(key.keyCode == 65){
				ship.speedyX = -2;
			}
		}
	}	
};

function render() {
	sceneActive.draw();
	frames++;
	requestAnimationFrame(render);
}

window.addEventListener('keydown', function(e){
	
	if(sceneActive.keyPress){
		sceneActive.keyPress(e);
	}
	
});

changeScene(scenes.start);
render();

// Font: emery