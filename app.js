setInterval(createSnowFlake,50); 
function createSnowFlake() {
    const snow_flake = document.createElement('b');
	snow_flake.textContent = "❄";
    snow_flake.classList.add('snowcla');
    snow_flake.classList.add('snow-flake');
	snow_flake.style.left = Math.random() * window.innerWidth + 'px';
	snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's';
	snow_flake.style.opacity = Math.random();
	snow_flake.style.fontSize = Math.random() * 10 + 10 + 'px'; 
    document.getElementById('snow').appendChild(snow_flake);
	setTimeout(() => {
		snow_flake.remove();
	}, 12000)
}








/*function createSnowFlake() {
	const snow_flake = document.createElement('i');
   	snow_flake.classList.add('snow-flake');
	snow_flake.style.left = Math.random() * window.innerWidth + 'px';
	snow_flake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
	snow_flake.style.opacity = Math.random();
	snow_flake.style.fontSize = Math.random() * 10 + 10 + 'px';
	
	document.body.appendChild(snow_flake);
	
	setTimeout(() => {
		snow_flake.remove();
	}, 5000)
}*/ //a new javascript file                 