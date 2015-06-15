var inzoart = (function(){
	var images, position, options, elementContent, 
		time, width, height, intervalSlider;
		
	// TODO: Si las imagenes son diferentes setear el promedio para ancho y alto.
	// TODO: Agregar funciones para next, back.
	// TODO: Por defecto no agrega botones, si lo setea en las opciones implementar.

	function init(element, options){
		images = options.images || [];
		elementContent = element;
		// time in miliseconds
		time = options.time || 4000;
		width = options.width || 300;
		height = options.height || 150;

		if(!images)return;
		if(!element)return;
		
		initSlider();
	}

	function initSlider(){
		var length, count, domElement;

		length = images.length;
		count = 1;
		domElement = document.getElementById(elementContent);

		for(var i = 0;i<length; i++){
			domElement.appendChild(createImage(images[i], i));
		}

		var firstElement = document.querySelectorAll('[data-position="0"]')[0];
		position = 0;

		firstElement.setAttribute("style", "display:inline");
		intervalManager(true);
	}

	function createImage(imgSrc, pos){
		var img = document.createElement("IMG");
		img.src = imgSrc;
		img.setAttribute("style","display:none");
		img.setAttribute("data-position", pos);
		img.height = height;
		img.width = width;
		return img;
	}

	function next(){
		var positionOld = position;
		position = position == images.length -1 ? 0 : position +1;
		var element = document.querySelectorAll('[data-position="'+ positionOld +'"]')[0];
		var elementNext = document.querySelectorAll('[data-position="'+ position +'"]')[0];

		fadeOut(element);
		setTimeout(function(){
			fadeIn(elementNext);
		},100);
		
	}

	function fadeOut(element) {
		if(!element)
			return;
		var opacity = 1;
		var interval = setInterval(function(){
			if(opacity <= 0){
				element.setAttribute("style", "opacity:" + opacity);
				opacity = opacity - 0.1;
			} else {
				element.setAttribute("style", "display:none");
				clearInterval(interval);
			}
		},20);
	}

	function fadeIn(element){
		if(!element)return;
		var opacity = 0;
		var interval = setInterval(function(){
			if(opacity >= 1){
				element.setAttribute("style", "opacity:" + opacity);
				opacity = opacity + 0.1;
			} else {
				element.setAttribute("style", "display:inline");
				clearInterval(interval);
			}
		},20);
	}

	function add(src){
		var domElement = document.getElementById(elementContent);
		domElement.appendChild(createImage(src, images.length));
		images.push(src);
	}

	function intervalManager(condition){
		// Set interval change the image
		if(condition){
			intervalSlider = setInterval(next, time);
		} else {
			clearInterval(intervalSlider);
		}
	}

	function stop() {
		intervalManager(false);
	}

	function start() {
		intervalManager(true);
	}

	return {
		slider: init,
		addImage: add,
		start: start,
		stop: stop
	}
})();