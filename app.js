setInterval(createSnowFlake,50);
setInterval(createStars,5); 
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
function createStars(){
	const stars= document.createElement('b')
	stars.textContent=('✹');
	stars.classList.add('glowcla');
	stars.classList.add('glow');
	stars.style.left = Math.random() * window.innerWidth +'px';
	stars.style.bottom = Math.random() * window.innerHeight +'px';
	stars.style.opacity = Math.random();
	stars.style.fontSize= Math.random() * 10 + 10 + 'px';
	document.getElementById('snow').appendChild(stars);
	setTimeout(() => {
		stars.remove();
	}, 4000)
}
                 