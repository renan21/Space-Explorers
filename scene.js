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
	x: 20,
	y: 20,	
	draw(){
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


const startGame = {};

const scenes = {
	start: {
		draw(){
			
		},
		update(){
			
		}
	}
	
};

function render() {

	drawBackGround();
	drawStars();
	ship.draw();
  
  requestAnimationFrame(render);
}

render();
