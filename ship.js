const sprites = new image();
sprites.src = '/images/ship.png';

const canvass = document.querySelector('#canvas');
const ctxx = canvass.getContext('2d');

function render(){
	

	requestAnimationFrame(render);	
}

render();

